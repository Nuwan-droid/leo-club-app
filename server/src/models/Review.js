import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    required: true,
    unique: true
  },
  project_id: {
    type: Number,
    required: false
  },
  body: {
    type: String,
    required: false,
    maxlength: 255
  },
  user_id: {
    type: Number,
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

export default mongoose.model('Review', reviewSchema);
