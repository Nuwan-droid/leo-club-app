import mongoose from 'mongoose';

const executiveMemberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  image_path: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  member_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Pre-save middleware to update the updated_at field
executiveMemberSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updated_at = new Date();
  }
  next();
});

// Pre-update middleware to update the updated_at field
executiveMemberSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updated_at: new Date() });
  next();
});

// Create the model
const ExecutiveMember = mongoose.model('ExecutiveMember', executiveMemberSchema);

// Export the model
export default ExecutiveMember;
