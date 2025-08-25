import Book from '../models/Book.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all books with filtering, sorting, and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from query
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Start building query
  let query = Book.find(JSON.parse(queryStr));

  // Add active filter
  query = query.find({ isActive: true });

  // Search functionality
  if (req.query.search) {
    query = query.find({
      $text: { $search: req.query.search }
    });
  }

  // Category filter
  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }

  // Author filter
  if (req.query.author) {
    query = query.find({ author: { $regex: req.query.author, $options: 'i' } });
  }

  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    const priceFilter = {};
    if (req.query.minPrice) priceFilter.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice) priceFilter.$lte = parseInt(req.query.maxPrice);
    query = query.find({ 'price.selling': priceFilter });
  }

  // Rating filter
  if (req.query.minRating) {
    query = query.find({ 'rating.average': { $gte: parseFloat(req.query.minRating) } });
  }

  // Stock filter
  if (req.query.inStock === 'true') {
    query = query.find({ 'stock.quantity': { $gt: 0 } });
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // Default sort by popularity and rating
    query = query.sort('-rating.average -salesCount');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Book.countDocuments(query.getQuery());

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const books = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: books.length,
    total,
    pagination,
    data: books
  });
});

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
export const getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book || !book.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Increment view count
  await book.incrementViews();

  res.status(200).json({
    success: true,
    data: book
  });
});

// @desc    Get featured books
// @route   GET /api/books/featured
// @access  Public
export const getFeaturedBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({ 
    isActive: true, 
    isFeatured: true 
  })
  .select('title author price images rating category discount')
  .sort('-rating.average')
  .limit(12);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get bestseller books
// @route   GET /api/books/bestsellers
// @access  Public
export const getBestsellers = asyncHandler(async (req, res, next) => {
  const books = await Book.find({ 
    isActive: true, 
    isBestseller: true 
  })
  .select('title author price images rating category discount salesCount')
  .sort('-salesCount -rating.average')
  .limit(12);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get books by category
// @route   GET /api/books/category/:category
// @access  Public
export const getBooksByCategory = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const books = await Book.find({ 
    isActive: true, 
    category: req.params.category 
  })
  .sort(req.query.sort || '-rating.average')
  .skip(startIndex)
  .limit(limit);

  const total = await Book.countDocuments({ 
    isActive: true, 
    category: req.params.category 
  });

  res.status(200).json({
    success: true,
    count: books.length,
    total,
    data: books
  });
});

// @desc    Get all categories with book counts
// @route   GET /api/books/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Book.aggregate([
    { $match: { isActive: true } },
    { 
      $group: { 
        _id: '$category', 
        count: { $sum: 1 },
        avgRating: { $avg: '$rating.average' },
        minPrice: { $min: '$price.selling' },
        maxPrice: { $max: '$price.selling' }
      } 
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get related books
// @route   GET /api/books/:id/related
// @access  Public
export const getRelatedBooks = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Find books in same category or by same author
  const relatedBooks = await Book.find({
    $and: [
      { _id: { $ne: book._id } },
      { isActive: true },
      {
        $or: [
          { category: book.category },
          { author: book.author }
        ]
      }
    ]
  })
  .select('title author price images rating category discount')
  .sort('-rating.average')
  .limit(8);

  res.status(200).json({
    success: true,
    count: relatedBooks.length,
    data: relatedBooks
  });
});

// @desc    Add book review
// @route   POST /api/books/:id/reviews
// @access  Private
export const addBookReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Check if user already reviewed this book
  const alreadyReviewed = book.reviews.find(
    review => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: 'Book already reviewed'
    });
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  };

  book.reviews.push(review);
  await book.updateRating();

  res.status(201).json({
    success: true,
    message: 'Review added successfully'
  });
});

// @desc    Search books
// @route   GET /api/books/search/:query
// @access  Public
export const searchBooks = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;

  const searchResults = await Book.find({
    $and: [
      { isActive: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { $text: { $search: query } }
        ]
      }
    ]
  })
  .select('title author price images rating category discount')
  .sort({ score: { $meta: 'textScore' }, 'rating.average': -1 })
  .skip(startIndex)
  .limit(limit);

  const total = await Book.countDocuments({
    $and: [
      { isActive: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  });

  res.status(200).json({
    success: true,
    count: searchResults.length,
    total,
    query,
    data: searchResults
  });
});

// ADMIN ROUTES

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: book
  });
});

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: book
  });
});

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  // Soft delete - set isActive to false
  book.isActive = false;
  await book.save();

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully'
  });
});

// @desc    Get book analytics
// @route   GET /api/books/analytics
// @access  Private/Admin
export const getBookAnalytics = asyncHandler(async (req, res, next) => {
  const analytics = await Book.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalBooks: { $sum: 1 },
        totalViews: { $sum: '$views' },
        totalSales: { $sum: '$salesCount' },
        avgRating: { $avg: '$rating.average' },
        avgPrice: { $avg: '$price.selling' }
      }
    }
  ]);

  const categoryStats = await Book.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalSales: { $sum: '$salesCount' },
        avgRating: { $avg: '$rating.average' }
      }
    },
    { $sort: { totalSales: -1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: analytics[0] || {},
      categoryStats
    }
  });
});
