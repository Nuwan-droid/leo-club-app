import mongoose from 'mongoose';

const learningHubSchema = new mongoose.Schema({
  contetent_id: {
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
  pass_score: {
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

export default mongoose.model('LearningHub', learningHubSchema);
