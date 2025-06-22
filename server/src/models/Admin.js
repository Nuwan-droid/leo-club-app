import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  admin_id: {
    type: Number,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  image_path: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  }
});

export default mongoose.model('Admin', adminSchema);
