import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      addresses: user.addresses,
      wishlist: user.wishlist
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone
  });

  sendTokenResponse(user, 201, res, 'User registered successfully');
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Update last login
  await user.updateLastLogin();

  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('wishlist');

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/auth/me
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res, 'Password updated successfully');
});

// @desc    Add address
// @route   POST /api/auth/address
// @access  Private
export const addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // If this is the first address or marked as default, make it default
  const isDefault = user.addresses.length === 0 || req.body.isDefault;

  if (isDefault) {
    // Remove default from other addresses
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses.push({
    ...req.body,
    isDefault
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: 'Address added successfully',
    data: user.addresses
  });
});

// @desc    Update address
// @route   PUT /api/auth/address/:addressId
// @access  Private
export const updateAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: 'Address not found'
    });
  }

  // Update address fields
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== undefined) {
      address[key] = req.body[key];
    }
  });

  // If setting as default, remove default from others
  if (req.body.isDefault) {
    user.addresses.forEach(addr => {
      if (addr._id.toString() !== req.params.addressId) {
        addr.isDefault = false;
      }
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Address updated successfully',
    data: user.addresses
  });
});

// @desc    Delete address
// @route   DELETE /api/auth/address/:addressId
// @access  Private
export const deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.addressId);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: 'Address not found'
    });
  }

  const wasDefault = address.isDefault;
  user.addresses.pull(req.params.addressId);

  // If deleted address was default, make first address default
  if (wasDefault && user.addresses.length > 0) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
    data: user.addresses
  });
});

// @desc    Add to wishlist
// @route   POST /api/auth/wishlist/:bookId
// @access  Private
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const bookId = req.params.bookId;

  if (user.wishlist.includes(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Book already in wishlist'
    });
  }

  user.wishlist.push(bookId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Book added to wishlist',
    data: user.wishlist
  });
});

// @desc    Remove from wishlist
// @route   DELETE /api/auth/wishlist/:bookId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.bookId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Book removed from wishlist',
    data: user.wishlist
  });
});

// @desc    Get wishlist
// @route   GET /api/auth/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'wishlist',
    select: 'title author price images rating category'
  });

  res.status(200).json({
    success: true,
    count: user.wishlist.length,
    data: user.wishlist
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});
