import mongoose from 'mongoose';

const learningHubSchema = new mongoose.Schema({
  content_id: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: false,
    maxlength: 255
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
  pass_score: {
    type: Date,
    required: false
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

// Pre-save middleware to update updated_at
learningHubSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model('LearningHub', learningHubSchema);
v