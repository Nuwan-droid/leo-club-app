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
    type: Date,
    required: false
  }
});

export default mongoose.model('Badge', badgeSchema);
