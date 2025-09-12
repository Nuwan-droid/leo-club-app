import mongoose from 'mongoose';

const donateProjectSchema = new mongoose.Schema({
  donation_project_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_path: {
    type: String,
    required: false
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  donation_items: {
    books: {
      required: { type: Number, default: 0 },
      received: { type: Number, default: 0 }
    },
    pens: {
      required: { type: Number, default: 0 },
      received: { type: Number, default: 0 }
    },
    clothes: {
      required: { type: Number, default: 0 },
      received: { type: Number, default: 0 }
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
donateProjectSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('DonationProject', donateProjectSchema);
