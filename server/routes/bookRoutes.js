import express from 'express';
import { body } from 'express-validator';
import {
  getBooks,
  getBook,
  getFeaturedBooks,
  getBestsellers,
  getBooksByCategory,
  getCategories,
  getRelatedBooks,
  addBookReview,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookAnalytics
} from '../controllers/bookController.js';
import { protect, authorize, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Comment must be between 5 and 500 characters')
];

const bookValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('price.mrp')
    .isNumeric()
    .withMessage('MRP must be a number'),
  body('price.selling')
    .isNumeric()
    .withMessage('Selling price must be a number'),
  body('stock.quantity')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer')
];

// Public routes
router.get('/', getBooks);
router.get('/featured', getFeaturedBooks);
router.get('/bestsellers', getBestsellers);
router.get('/categories', getCategories);
router.get('/category/:category', getBooksByCategory);
router.get('/search/:query', searchBooks);
router.get('/:id', optionalAuth, getBook);
router.get('/:id/related', getRelatedBooks);

// Protected routes
router.post('/:id/reviews', protect, reviewValidation, addBookReview);

// Admin routes
router.post('/', protect, authorize('admin'), bookValidation, createBook);
router.put('/:id', protect, authorize('admin'), updateBook);
router.delete('/:id', protect, authorize('admin'), deleteBook);
router.get('/admin/analytics', protect, authorize('admin'), getBookAnalytics);

export default router;
