import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import UserController from "../controllers/userController.js";

const router = express.Router();

// Protected routes (require authentication)
router.get('/me', protect, UserController.me);
router.get("/profile", UserController.getUserProfile);
router.get("/members/count", UserController.getMemberCount);

// User management routes
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getInactiveUsers", UserController.getInactiveUsers); // New route for inactive users

// User status management
router.patch("/inactivateUser/:id", UserController.inactivateUser);
router.patch("/reactivateUser/:id", UserController.reactivateUser); // New route for reactivation
router.patch("/toggleUserStatus/:id", UserController.toggleUserStatus);

export default router;