import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Book from '../models/Book.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res, next) => {
  const { shippingAddress, paymentMethod, deliverySlot, specialInstructions } = req.body;

  // Get user's cart
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty'
    });
  }

  // Validate stock availability
  for (const item of cart.items) {
    const book = await Book.findById(item.book._id);
    if (!book || book.stock.quantity < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${book ? book.title : 'unknown book'}`
      });
    }
  }

  // Prepare order items
  const orderItems = cart.items.map(item => ({
    book: item.book._id,
    title: item.book.title,
    author: item.book.author,
    image: item.book.images[0]?.url || '',
    quantity: item.quantity,
    price: item.price,
    mrp: item.book.price.mrp,
    discount: item.book.discount || 0
  }));

  // Calculate order summary
  const orderSummary = {
    totalItems: cart.totalItems,
    totalMRP: cart.totalMRP,
    totalAmount: cart.totalAmount,
    totalDiscount: cart.totalMRP - cart.totalAmount,
    deliveryCharges: cart.deliveryCharges,
    finalAmount: cart.finalAmount
  };

  // Create order
  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    orderSummary,
    shippingAddress,
    paymentInfo: {
      method: paymentMethod,
      status: paymentMethod === 'cod' ? 'pending' : 'completed'
    },
    deliverySlot,
    specialInstructions,
    trackingInfo: {
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    }
  });

  // Update book stock and sales count
  for (const item of cart.items) {
    await Book.findByIdAndUpdate(item.book._id, {
      $inc: {
        'stock.quantity': -item.quantity,
        salesCount: item.quantity
      }
    });
  }

  // Clear cart
  await cart.clearCart();

  // Populate order for response
  const populatedOrder = await Order.findById(order._id).populate('items.book', 'title author images');

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: populatedOrder
  });
});

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
    .populate('items.book', 'title author images');

  const total = await Order.countDocuments({ user: req.user._id });

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('items.book', 'title author images');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Make sure user owns this order or is admin
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this order'
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to cancel this order'
    });
  }

  // Check if order can be cancelled
  const cancellableStatuses = ['placed', 'confirmed', 'processing'];
  if (!cancellableStatuses.includes(order.orderStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Order cannot be cancelled at this stage'
    });
  }

  // Restore stock
  for (const item of order.items) {
    await Book.findByIdAndUpdate(item.book, {
      $inc: {
        'stock.quantity': item.quantity,
        salesCount: -item.quantity
      }
    });
  }

  // Cancel order
  const refundAmount = order.paymentInfo.status === 'completed' ? order.orderSummary.finalAmount : 0;
  await order.cancelOrder(reason, refundAmount);

  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    data: order
  });
});

// @desc    Track order
// @route   GET /api/orders/:id/track
// @access  Private
export const trackOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to track this order'
    });
  }

  const trackingInfo = {
    orderId: order.orderId,
    currentStatus: order.orderStatus,
    statusHistory: order.statusHistory,
    trackingNumber: order.trackingInfo.trackingNumber,
    estimatedDelivery: order.trackingInfo.estimatedDelivery,
    actualDelivery: order.trackingInfo.actualDelivery
  };

  res.status(200).json({
    success: true,
    data: trackingInfo
  });
});

// @desc    Return order
// @route   PUT /api/orders/:id/return
// @access  Private
export const returnOrder = asyncHandler(async (req, res, next) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to return this order'
    });
  }

  // Check if order is delivered
  if (order.orderStatus !== 'delivered') {
    return res.status(400).json({
      success: false,
      message: 'Only delivered orders can be returned'
    });
  }

  // Check return window (7 days)
  const deliveryDate = order.trackingInfo.actualDelivery || order.createdAt;
  const returnWindow = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
  if (Date.now() - deliveryDate.getTime() > returnWindow) {
    return res.status(400).json({
      success: false,
      message: 'Return window has expired (7 days from delivery)'
    });
  }

  // Update order status
  order.orderStatus = 'returned';
  order.returnReason = reason;
  order.paymentInfo.status = 'refunded';
  order.paymentInfo.refundAmount = order.orderSummary.finalAmount;
  order.paymentInfo.refundDate = new Date();

  order.statusHistory.push({
    status: 'returned',
    timestamp: new Date(),
    comment: reason
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Return request submitted successfully',
    data: order
  });
});

// @desc    Rate order items
// @route   POST /api/orders/:id/rate
// @access  Private
export const rateOrder = asyncHandler(async (req, res, next) => {
  const { ratings } = req.body; // Array of { bookId, rating, review }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Check if user owns this order
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to rate this order'
    });
  }

  // Check if order is delivered
  if (order.orderStatus !== 'delivered') {
    return res.status(400).json({
      success: false,
      message: 'Only delivered orders can be rated'
    });
  }

  // Add ratings to order
  for (const rating of ratings) {
    const existingRating = order.ratings.find(r => r.book.toString() === rating.bookId);
    
    if (!existingRating) {
      order.ratings.push({
        book: rating.bookId,
        rating: rating.rating,
        review: rating.review
      });

      // Add review to book
      const book = await Book.findById(rating.bookId);
      if (book) {
        book.reviews.push({
          user: req.user._id,
          name: req.user.name,
          rating: rating.rating,
          comment: rating.review,
          verified: true // Since this is from a purchase
        });
        await book.updateRating();
      }
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Ratings submitted successfully',
    data: order
  });
});

// ADMIN ROUTES

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  // Build query
  let query = {};
  
  if (req.query.status) {
    query.orderStatus = req.query.status;
  }
  
  if (req.query.paymentStatus) {
    query['paymentInfo.status'] = req.query.paymentStatus;
  }

  const orders = await Order.find(query)
    .populate('user', 'name email phone')
    .populate('items.book', 'title author')
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);

  const total = await Order.countDocuments(query);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    data: orders
  });
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, comment, trackingNumber, carrier } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  // Update order status
  await order.updateStatus(status, comment, req.user.name);

  // Update tracking info if provided
  if (trackingNumber) {
    order.trackingInfo.trackingNumber = trackingNumber;
  }
  
  if (carrier) {
    order.trackingInfo.carrier = carrier;
  }

  // Set actual delivery date if status is delivered
  if (status === 'delivered') {
    order.trackingInfo.actualDelivery = new Date();
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: order
  });
});

// @desc    Get order analytics (Admin)
// @route   GET /api/orders/analytics
// @access  Private/Admin
export const getOrderAnalytics = asyncHandler(async (req, res, next) => {
  const analytics = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$orderSummary.finalAmount' },
        avgOrderValue: { $avg: '$orderSummary.finalAmount' }
      }
    }
  ]);

  const statusStats = await Order.aggregate([
    {
      $group: {
        _id: '$orderStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const monthlyStats = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        orders: { $sum: 1 },
        revenue: { $sum: '$orderSummary.finalAmount' }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: analytics[0] || {},
      statusStats,
      monthlyStats
    }
  });
});
