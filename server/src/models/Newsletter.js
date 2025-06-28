import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  newsletter_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: false,
    maxlength: 255
  },
  description: {
    type: String,
    required: false,
    maxlength: 255
  },
  image_path: {
    type: String,
    required: false,
    maxlength: 255
  },
  date: {
    type: String,
    required: false,
    maxlength: 255
  },
  user_id: {
    type: String,
    required: false,
    maxlength: 255
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

// Pre-save middleware to update updated_at field
newsletterSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('Newsletter', newsletterSchema);
