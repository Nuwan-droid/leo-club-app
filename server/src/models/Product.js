import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  colour: {
    type: String,
    maxlength: 255,
    trim: true
  },
  size: {
    type: String,
    maxlength: 255,
    trim: true
  },
  price: {
    type: Number,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0 && Number(v.toFixed(2)) === v;
      },
      message: 'Price must be a positive number with max 2 decimal places'
    }
  },
  stock: {
    type: Number,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer'
    }
  },
  image_path: {
    type: String,
    maxlength: 255,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update updated_at
productSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Index for better query performance (equivalent to MySQL KEY)
productSchema.index({ product_id: 1 });

export default mongoose.model('Product', productSchema);
