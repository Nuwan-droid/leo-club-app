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
    required: false
  },
  answer: {
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

export default mongoose.model('ChatbotInteraction', chatbotInteractionSchema);
