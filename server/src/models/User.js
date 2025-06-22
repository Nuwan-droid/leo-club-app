import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  Password: {
    type: String,
    required: false
  },
  bod: {
    type: Date,
    required: false
  },
  Role: {
    type: String,
    required: false
  },
  image_path: {
    type: String,
    required: false
  },
  remember_token: {
    type: String,
    required: false
  },
  score: {
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
  },
  Field: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  }
});

export default mongoose.model('User', userSchema);
