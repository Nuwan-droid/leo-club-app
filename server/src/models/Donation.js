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
    required: false,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
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

// Pre-save middleware to update updated_at
donationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('Donation', donationSchema);
