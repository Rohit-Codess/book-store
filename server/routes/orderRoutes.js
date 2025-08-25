import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getUserOrders,
  getOrder,
  cancelOrder,
  trackOrder,
  returnOrder,
  rateOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderAnalytics
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('shippingAddress.name')
    .trim()
    .notEmpty()
    .withMessage('Shipping name is required'),
  body('shippingAddress.phone')
    .isMobilePhone('en-IN')
    .withMessage('Valid phone number is required'),
  body('shippingAddress.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.pincode')
    .isNumeric()
    .isLength({ min: 6, max: 6 })
    .withMessage('Valid 6-digit pincode is required'),
  body('paymentMethod')
    .isIn(['cod', 'upi', 'card', 'netbanking', 'wallet'])
    .withMessage('Invalid payment method')
];

const cancelOrderValidation = [
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Cancellation reason is required')
];

const returnOrderValidation = [
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Return reason is required')
];

const rateOrderValidation = [
  body('ratings')
    .isArray({ min: 1 })
    .withMessage('At least one rating is required'),
  body('ratings.*.bookId')
    .isMongoId()
    .withMessage('Invalid book ID'),
  body('ratings.*.rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('ratings.*.review')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Review cannot exceed 500 characters')
];

const updateStatusValidation = [
  body('status')
    .isIn([
      'placed',
      'confirmed',
      'processing',
      'packed',
      'shipped',
      'out-for-delivery',
      'delivered',
      'cancelled',
      'returned',
      'refunded'
    ])
    .withMessage('Invalid order status')
];

// All routes require authentication
router.use(protect);

// User routes
router.post('/', createOrderValidation, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);
router.get('/:id/track', trackOrder);
router.put('/:id/cancel', cancelOrderValidation, cancelOrder);
router.put('/:id/return', returnOrderValidation, returnOrder);
router.post('/:id/rate', rateOrderValidation, rateOrder);

// Admin routes
router.get('/admin/all', authorize('admin'), getAllOrders);
router.put('/:id/status', authorize('admin'), updateStatusValidation, updateOrderStatus);
router.get('/admin/analytics', authorize('admin'), getOrderAnalytics);

export default router;
