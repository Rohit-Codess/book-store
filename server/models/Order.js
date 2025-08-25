import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mrp: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  orderSummary: {
    totalItems: {
      type: Number,
      required: true
    },
    totalMRP: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
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
      required: true
    }
  },
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: String,
    address: {
      type: String,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    landmark: String,
    addressType: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    }
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['cod', 'upi', 'card', 'netbanking', 'wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentDate: Date,
    refundAmount: {
      type: Number,
      default: 0
    },
    refundDate: Date
  },
  orderStatus: {
    type: String,
    enum: [
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
    ],
    default: 'placed'
  },
  trackingInfo: {
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    trackingUrl: String
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    comment: String,
    updatedBy: {
      type: String,
      default: 'system'
    }
  }],
  deliverySlot: {
    date: Date,
    timeSlot: {
      type: String,
      enum: ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM']
    }
  },
  specialInstructions: String,
  cancellationReason: String,
  returnReason: String,
  ratings: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    ratedAt: {
      type: Date,
      default: Date.now
    }
  }],
  invoice: {
    invoiceNumber: String,
    invoiceDate: Date,
    invoiceUrl: String
  }
}, {
  timestamps: true
});

// Generate unique order ID
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.orderId = `BW${timestamp.slice(-8)}${random}`;
  }
  
  // Add status to history if status changed
  if (this.isModified('orderStatus') && !this.isNew) {
    this.statusHistory.push({
      status: this.orderStatus,
      timestamp: new Date()
    });
  }
  
  next();
});

// Calculate delivery date
orderSchema.methods.calculateDeliveryDate = function() {
  const orderDate = this.createdAt || new Date();
  const deliveryDate = new Date(orderDate);
  
  // Add 3-7 business days for delivery
  const businessDays = Math.floor(Math.random() * 5) + 3;
  deliveryDate.setDate(deliveryDate.getDate() + businessDays);
  
  return deliveryDate;
};

// Update order status
orderSchema.methods.updateStatus = function(newStatus, comment = '', updatedBy = 'system') {
  this.orderStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    comment,
    updatedBy
  });
  
  // Update payment status for COD orders
  if (newStatus === 'delivered' && this.paymentInfo.method === 'cod') {
    this.paymentInfo.status = 'completed';
    this.paymentInfo.paymentDate = new Date();
  }
  
  return this.save();
};

// Cancel order
orderSchema.methods.cancelOrder = function(reason, refundAmount = 0) {
  this.orderStatus = 'cancelled';
  this.cancellationReason = reason;
  
  if (refundAmount > 0) {
    this.paymentInfo.status = 'refunded';
    this.paymentInfo.refundAmount = refundAmount;
    this.paymentInfo.refundDate = new Date();
  }
  
  this.statusHistory.push({
    status: 'cancelled',
    timestamp: new Date(),
    comment: reason
  });
  
  return this.save();
};

// Get order summary for user
orderSchema.methods.getOrderSummary = function() {
  return {
    orderId: this.orderId,
    orderDate: this.createdAt,
    status: this.orderStatus,
    totalItems: this.orderSummary.totalItems,
    finalAmount: this.orderSummary.finalAmount,
    paymentMethod: this.paymentInfo.method,
    estimatedDelivery: this.trackingInfo.estimatedDelivery
  };
};

// Indexes for efficient queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ 'paymentInfo.status': 1 });

export default mongoose.model('Order', orderSchema);
