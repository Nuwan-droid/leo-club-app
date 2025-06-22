import mongoose from 'mongoose';

const chatbotInteractionSchema = new mongoose.Schema({
  iteract_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: false
  },
  question: {
    type: String,
    required: false,
    maxlength: 255
  },
  answer: {
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
chatbotInteractionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Create indexes for better performance (equivalent to MySQL KEYs)
chatbotInteractionSchema.index({ iteract_id: 1 }, { unique: true });
chatbotInteractionSchema.index({ user_id: 1 });

export default mongoose.model('ChatbotInteraction', chatbotInteractionSchema);
