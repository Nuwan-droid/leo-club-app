import Comment from '../models/Comment.js';
import Project from '../models/Project.js';
import mongoose from 'mongoose';

// Add a comment to a project (Protected route)
export const addComment = async (req, res) => {
  try {
    const { projectId, comment } = req.body;
    
    if (!projectId || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: "Project ID and comment are required" 
      });
    }
    
    // Verify project exists
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }
    
    // Get user name from authenticated user
    const userName = req.user.role === 'admin' 
      ? (req.user.name || `${req.user.firstName} ${req.user.lastName}`)
      : `${req.user.firstName} ${req.user.lastName}`;
    
    const newComment = new Comment({
      projectId,
      name: userName,
      comment,
      userId: req.user._id // Store user ID for future reference
    });
    
    await newComment.save();
    console.log("Comment added for project:", projectId, "by user:", userName);
    
    res.json({ 
      success: true, 
      message: "Comment added successfully",
      comment: newComment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all comments for a specific project (Public route)
export const getCommentsByProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    
    if (isNaN(projectId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid project ID" 
      });
    }
    
    const comments = await Comment.find({ projectId })
      .sort({ createdAt: -1 }); // Most recent first
    
    console.log(`Fetched ${comments.length} comments for project:`, projectId);
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment (Protected route - only comment owner or admin)
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid comment ID" 
      });
    }
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ 
        success: false, 
        message: "Comment not found" 
      });
    }
    
    // Check if user owns the comment or is admin
    if (comment.userId?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to delete this comment" 
      });
    }
    
    await Comment.findByIdAndDelete(commentId);
    console.log("Comment deleted:", commentId, "by user:", req.user._id);
    res.json({ success: true, message: "Comment deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a comment (Protected route - only comment owner)
export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { comment } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid comment ID" 
      });
    }
    
    if (!comment) {
      return res.status(400).json({ 
        success: false, 
        message: "Comment text is required" 
      });
    }
    
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ 
        success: false, 
        message: "Comment not found" 
      });
    }
    
    // Check if user owns the comment
    if (existingComment.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to update this comment" 
      });
    }
    
    const result = await Comment.findByIdAndUpdate(
      commentId, 
      { comment }, 
      { new: true }
    );
    
    console.log("Comment updated:", commentId, "by user:", req.user._id);
    res.json({ 
      success: true, 
      message: "Comment updated successfully",
      comment: result
    });
    
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get comment statistics (Public route)
export const getCommentStats = async (req, res) => {
  try {
    const totalComments = await Comment.countDocuments();
    const commentsByProject = await Comment.aggregate([
      {
        $group: {
          _id: '$projectId',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      totalComments,
      commentsByProject
    });
  } catch (error) {
    console.error("Error fetching comment stats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};