import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalItems: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  totalMRP: {
    type: Number,
    default: 0
  },
  totalDiscount: {
    type: Number,
    default: 0
  },
  deliveryCharges: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  
  this.totalMRP = this.items.reduce((total, item) => {
    // We'll need to populate book data to get MRP
    return total + (item.price * item.quantity);
  }, 0);
  
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Free delivery on orders above ₹499
  this.deliveryCharges = this.totalAmount >= 499 ? 0 : 40;
  
  this.finalAmount = this.totalAmount + this.deliveryCharges;
  
  this.lastModified = new Date();
  
  next();
});

// Add item to cart
cartSchema.methods.addItem = function(bookId, quantity = 1, price) {
  const existingItemIndex = this.items.findIndex(item => 
    item.book.toString() === bookId.toString()
  );
  
  if (existingItemIndex > -1) {
    // Update existing item
    this.items[existingItemIndex].quantity += quantity;
    this.items[existingItemIndex].addedAt = new Date();
  } else {
    // Add new item
    this.items.push({
      book: bookId,
      quantity,
      price,
      addedAt: new Date()
    });
  }
  
  return this.save();
};

// Update item quantity
cartSchema.methods.updateItemQuantity = function(bookId, quantity) {
  const itemIndex = this.items.findIndex(item => 
    item.book.toString() === bookId.toString()
  );
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      this.items.splice(itemIndex, 1);
    } else {
      this.items[itemIndex].quantity = quantity;
    }
    return this.save();
  }
  
  throw new Error('Item not found in cart');
};

// Remove item from cart
cartSchema.methods.removeItem = function(bookId) {
  this.items = this.items.filter(item => 
    item.book.toString() !== bookId.toString()
  );
  return this.save();
};

// Clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  return this.save();
};

// Get cart summary
cartSchema.methods.getSummary = function() {
  return {
    totalItems: this.totalItems,
    totalAmount: this.totalAmount,
    totalMRP: this.totalMRP,
    totalDiscount: this.totalDiscount,
    deliveryCharges: this.deliveryCharges,
    finalAmount: this.finalAmount,
    savings: this.totalMRP - this.totalAmount
  };
};

export default mongoose.model('Cart', cartSchema);
