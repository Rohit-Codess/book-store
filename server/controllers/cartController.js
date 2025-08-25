import Cart from '../models/Cart.js';
import Book from '../models/Book.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.book',
    select: 'title author price images rating stock category'
  });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res, next) => {
  const { bookId, quantity = 1 } = req.body;

  // Check if book exists and is available
  const book = await Book.findById(bookId);
  if (!book || !book.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Check stock availability
  if (book.stock.quantity < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${book.stock.quantity} items available in stock`
    });
  }

  // Get or create cart
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.book.toString() === bookId
  );

  if (existingItemIndex > -1) {
    // Update quantity of existing item
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    
    // Check if new quantity exceeds stock
    if (newQuantity > book.stock.quantity) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more items. Only ${book.stock.quantity} available in stock`
      });
    }

    cart.items[existingItemIndex].quantity = newQuantity;
    cart.items[existingItemIndex].addedAt = new Date();
  } else {
    // Add new item to cart
    cart.items.push({
      book: bookId,
      quantity,
      price: book.price.selling,
      addedAt: new Date()
    });
  }

  await cart.save();

  // Populate and return updated cart
  cart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price images rating stock category'
  });

  res.status(200).json({
    success: true,
    message: 'Item added to cart successfully',
    data: cart
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { bookId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be at least 1'
    });
  }

  // Check book stock
  const book = await Book.findById(bookId);
  if (!book || !book.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  if (quantity > book.stock.quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${book.stock.quantity} items available in stock`
    });
  }

  // Get cart
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  // Find and update item
  const itemIndex = cart.items.findIndex(
    item => item.book.toString() === bookId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    });
  }

  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].price = book.price.selling; // Update price in case it changed
  await cart.save();

  // Populate and return updated cart
  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price images rating stock category'
  });

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: updatedCart
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:bookId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params;

  // Get cart
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  // Remove item
  cart.items = cart.items.filter(
    item => item.book.toString() !== bookId
  );

  await cart.save();

  // Populate and return updated cart
  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price images rating stock category'
  });

  res.status(200).json({
    success: true,
    message: 'Item removed from cart successfully',
    data: updatedCart
  });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: cart
  });
});

// @desc    Get cart summary
// @route   GET /api/cart/summary
// @access  Private
export const getCartSummary = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.book',
    select: 'title price.mrp price.selling stock'
  });

  if (!cart || cart.items.length === 0) {
    return res.status(200).json({
      success: true,
      data: {
        totalItems: 0,
        totalAmount: 0,
        totalMRP: 0,
        totalDiscount: 0,
        deliveryCharges: 0,
        finalAmount: 0,
        savings: 0
      }
    });
  }

  // Calculate detailed summary
  let totalItems = 0;
  let totalMRP = 0;
  let totalAmount = 0;

  cart.items.forEach(item => {
    if (item.book) {
      totalItems += item.quantity;
      totalMRP += item.book.price.mrp * item.quantity;
      totalAmount += item.price * item.quantity;
    }
  });

  const totalDiscount = totalMRP - totalAmount;
  const deliveryCharges = totalAmount >= 499 ? 0 : 40;
  const finalAmount = totalAmount + deliveryCharges;
  const savings = totalDiscount;

  const summary = {
    totalItems,
    totalAmount,
    totalMRP,
    totalDiscount,
    deliveryCharges,
    finalAmount,
    savings
  };

  res.status(200).json({
    success: true,
    data: summary
  });
});

// @desc    Apply coupon to cart
// @route   POST /api/cart/coupon
// @access  Private
export const applyCoupon = asyncHandler(async (req, res, next) => {
  const { couponCode } = req.body;

  // This is a placeholder for coupon functionality
  // In a real app, you'd have a Coupon model and validation logic

  const validCoupons = {
    'WELCOME10': { discount: 10, type: 'percentage', minAmount: 200 },
    'FLAT50': { discount: 50, type: 'fixed', minAmount: 500 },
    'NEWUSER': { discount: 15, type: 'percentage', minAmount: 300 }
  };

  const coupon = validCoupons[couponCode.toUpperCase()];

  if (!coupon) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coupon code'
    });
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty'
    });
  }

  if (cart.totalAmount < coupon.minAmount) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount should be ₹${coupon.minAmount}`
    });
  }

  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = (cart.totalAmount * coupon.discount) / 100;
  } else {
    discountAmount = coupon.discount;
  }

  res.status(200).json({
    success: true,
    message: 'Coupon applied successfully',
    data: {
      couponCode,
      discountAmount,
      finalAmount: cart.finalAmount - discountAmount
    }
  });
});

// @desc    Get cart item count
// @route   GET /api/cart/count
// @access  Private
export const getCartItemCount = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  
  const count = cart ? cart.totalItems : 0;

  res.status(200).json({
    success: true,
    count
  });
});
