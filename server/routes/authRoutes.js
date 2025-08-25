import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  logout
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];

const addressValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('phone')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid phone number'),
  body('pincode')
    .isNumeric()
    .isLength({ min: 6, max: 6 })
    .withMessage('Please provide a valid 6-digit pincode'),
  body('locality')
    .trim()
    .notEmpty()
    .withMessage('Locality is required'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.use(protect); // All routes below are protected

router.get('/me', getMe);
router.put('/me', updateDetails);
router.put('/updatepassword', updatePasswordValidation, updatePassword);
router.post('/logout', logout);

// Address routes
router.post('/address', addressValidation, addAddress);
router.put('/address/:addressId', addressValidation, updateAddress);
router.delete('/address/:addressId', deleteAddress);

// Wishlist routes
router.get('/wishlist', getWishlist);
router.post('/wishlist/:bookId', addToWishlist);
router.delete('/wishlist/:bookId', removeFromWishlist);

export default router;
