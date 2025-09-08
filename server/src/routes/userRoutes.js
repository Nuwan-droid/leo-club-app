import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import UserController from "../controllers/userController.js";

const router = express.Router();


router.get('/me', protect,UserController.me);
router.get("/profile",UserController.getUserProfile);
router.get("/members/count", UserController.getMemberCount);
router.get("/getAllUsers",UserController.getAllUsers);


export default router;

