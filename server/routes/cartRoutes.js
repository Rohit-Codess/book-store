import express from 'express';
import { body } from 'express-validator';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartSummary,
  applyCoupon,
  getCartItemCount
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const addToCartValidation = [
  body('bookId')
    .isMongoId()
    .withMessage('Invalid book ID'),
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10')
];

const updateCartValidation = [
  body('bookId')
    .isMongoId()
    .withMessage('Invalid book ID'),
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10')
];

const couponValidation = [
  body('couponCode')
    .trim()
    .notEmpty()
    .withMessage('Coupon code is required')
];

// All cart routes require authentication
router.use(protect);

// Cart routes
router.get('/', getCart);
router.get('/count', getCartItemCount);
router.get('/summary', getCartSummary);
router.post('/add', addToCartValidation, addToCart);
router.put('/update', updateCartValidation, updateCartItem);
router.delete('/remove/:bookId', removeFromCart);
router.delete('/clear', clearCart);
router.post('/coupon', couponValidation, applyCoupon);

export default router;
