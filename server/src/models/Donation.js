import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donate_id: {
    type: Number,
    required: true,
    unique: true
  },
  amount: {
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
  email: {
    type: String,
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
  donation_project_id: {
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

export default mongoose.model('Donation', donationSchema);
