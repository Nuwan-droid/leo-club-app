import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  project_id: {
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
  location: {
    type: String,
    required: false
  },
  start_date: {
    type: String,
    required: false
  },
  end_date: {
    type: String,
    required: false
  },
  image_path: {
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

export default mongoose.model('Project', projectSchema);
