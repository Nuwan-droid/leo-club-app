import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  projectId: { 
    type: Number, 
    required: true,
    ref: 'Project'
  },
  name: { 
    type: String, 
    required: true 
  },
  comment: { 
    type: String, 
    required: true 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Now required since only authenticated users can comment
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;