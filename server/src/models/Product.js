import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  colour: {
    type: String,
    required: false
  },
  size: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  stock: {
    type: Number,
    required: false
  },
  image_path: {
    type: String,
    required: false
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

export default mongoose.model('Product', productSchema);
