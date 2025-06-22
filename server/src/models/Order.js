import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true
  },
  product_id: {
    type: Number,
    required: false,
    index: true // Equivalent to MySQL foreign key index
  },
  size: {
    type: String,
    required: false,
    maxlength: 255
  },
  colour: {
    type: String,
    required: false,
    maxlength: 255
  },
  quantity: {
    type: Number,
    required: false,
    min: 0
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
    get: function(value) {
      return parseFloat(value?.toString() || '0');
    }
  },
  first_name: {
    type: String,
    required: false,
    maxlength: 255
  },
  last_name: {
    type: String,
    required: false,
    maxlength: 255
  },
  email: {
    type: String,
    required: false,
    maxlength: 255,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    required: false,
    maxlength: 255
  },
  address: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false,
    maxlength: 255,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
  },
  creaed_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance (equivalent to MySQL keys)
orderSchema.index({ order_id: 1 });
orderSchema.index({ product_id: 1 });

// Pre-save middleware to update updated_at
orderSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model('Order', orderSchema);
