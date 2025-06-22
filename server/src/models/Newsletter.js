import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  newsletter_id: {
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
  image_path: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  user_id: {
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
