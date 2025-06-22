import mongoose from 'mongoose';

const donateProjectSchema = new mongoose.Schema({
  donation_project_id: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: false
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
  start_date: {
    type: Date,
    required: false
  },
  end_date: {
    type: Date,
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

export default mongoose.model('DonateProject', donateProjectSchema);
