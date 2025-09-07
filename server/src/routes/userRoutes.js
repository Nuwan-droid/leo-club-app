import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import UserController from "../controllers/usercontroller.js";

const router = express.Router();


//---------------------------get e---------------
router.get('/me', protect,UserController.me);

//---------------------------get User profile---------------
router.get("/profile",UserController.getUserProfile);

export default router;
