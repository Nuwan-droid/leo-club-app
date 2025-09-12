import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  badge_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: false
  },
  date_issued: {
    type: String,
    required: false
  },
  image_path: {   // ✅ New field for image storage
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Badge', badgeSchema);
