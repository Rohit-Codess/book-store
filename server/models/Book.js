import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxLength: [500, 'Review cannot be more than 500 characters']
  },
  likes: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxLength: [200, 'Title cannot be more than 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Book description is required'],
    maxLength: [2000, 'Description cannot be more than 2000 characters']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Please provide a valid ISBN']
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
    trim: true
  },
  publishedDate: {
    type: Date
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Fiction',
      'Non-Fiction',
      'Science & Technology',
      'Business & Economics',
      'History & Biography',
      'Health & Wellness',
      'Art & Design',
      'Religion & Spirituality',
      'Travel & Adventure',
      'Cooking & Food',
      'Sports & Recreation',
      'Children & Young Adult',
      'Academic Textbooks',
      'Self-Help',
      'Mystery & Thriller',
      'Romance',
      'Fantasy & Sci-Fi'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    default: 'English'
  },
  pages: {
    type: Number,
    min: [1, 'Pages must be at least 1']
  },
  format: {
    type: String,
    enum: ['Paperback', 'Hardcover', 'eBook', 'Audiobook'],
    default: 'Paperback'
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['g', 'kg'],
      default: 'g'
    }
  },
  price: {
    mrp: {
      type: Number,
      required: [true, 'MRP is required'],
      min: [0, 'Price cannot be negative']
    },
    selling: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  stock: {
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    threshold: {
      type: Number,
      default: 10
    },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock'
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [reviewSchema],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update stock status based on quantity
bookSchema.pre('save', function(next) {
  if (this.stock.quantity <= 0) {
    this.stock.status = 'out-of-stock';
  } else if (this.stock.quantity <= this.stock.threshold) {
    this.stock.status = 'low-stock';
  } else {
    this.stock.status = 'in-stock';
  }
  
  // Calculate discount percentage
  if (this.price.mrp && this.price.selling) {
    this.discount = Math.round(((this.price.mrp - this.price.selling) / this.price.mrp) * 100);
  }
  
  next();
});

// Update rating when reviews change
bookSchema.methods.updateRating = function() {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = (totalRating / this.reviews.length).toFixed(1);
    this.rating.count = this.reviews.length;
  } else {
    this.rating.average = 0;
    this.rating.count = 0;
  }
  return this.save();
};

// Increment view count
bookSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Search index
bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text',
  category: 'text',
  tags: 'text'
});

// Compound indexes for common queries
bookSchema.index({ category: 1, 'price.selling': 1 });
bookSchema.index({ 'rating.average': -1, salesCount: -1 });
bookSchema.index({ isActive: 1, isFeatured: 1 });

export default mongoose.model('Book', bookSchema);
