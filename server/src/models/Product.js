import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
    // required: true // Temporarily removed to test hook
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    default: null,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size']
  }],
  colors: [{
    type: String
  }],
  material: [{
    type: String,
    trim: true
  }],
  badge: {
    type: String,
    default: null,
    trim: true
  },
  mainImage: {
    type: String,
    default: ''
  },
  additionalImages: [{
    type: String
  }]
}, {
  timestamps: true
});

// Pre-save hook to handle product_id generation
productSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for document:', this.isNew ? 'New' : 'Existing', JSON.stringify(this, null, 2));
  if (this.isNew) {
    try {
      const lastProduct = await this.constructor.findOne({}, {}, { sort: { product_id: -1 } }).exec();
      this.product_id = lastProduct && lastProduct.product_id ? lastProduct.product_id + 1 : 1;
      console.log('Generated product_id:', this.product_id);
    } catch (error) {
      console.error('Error generating product_id:', error);
      return next(new Error('Failed to generate product_id: ' + error.message));
    }
  }
  next();
});

// Indexes for better performance
productSchema.index({ name: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model('Product', productSchema);