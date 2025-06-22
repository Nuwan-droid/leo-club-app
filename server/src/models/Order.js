import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true
  },
  product_id: {
    type: Number,
    required: false
  },
  size: {
    type: String,
    required: false
  },
  colour: {
    type: String,
    required: false
  },
  quatity: {
    type: Number,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  status: {
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

export default mongoose.model('Order', orderSchema);
