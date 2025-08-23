import express from "express";
import {
  addComment,
  getCommentsByProject,
  deleteComment,
  updateComment,
  getCommentStats
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Comment routes
router.post("/addcomment", protect, addComment); // Protected - only authenticated users
router.get("/comments/:projectId", getCommentsByProject); // Public - anyone can view comments
router.delete("/comment/:commentId", protect, deleteComment); // Protected - only comment owner or admin
router.put("/comment/:commentId", protect, updateComment); // Protected - only comment owner
router.get("/comment-stats", getCommentStats); // Public - anyone can view stats

export default router;