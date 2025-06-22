import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  admin_id: {
    type: Number,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: false,
    maxlength: 255
  },
  name: {
    type: String,
    required: false,
    maxlength: 255
  },
  image_path: {
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
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'admin', 'user_management', 'content_management']
  }],
  is_active: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
});

adminSchema.index({ admin_id: 1 });

export default mongoose.model('Admin', adminSchema);
