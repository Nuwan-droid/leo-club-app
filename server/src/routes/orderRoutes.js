import express from 'express';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderById
} from '../controllers/orderController.js';
import { protect, optionalAuth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new order (supports both member and visitor)
router.post('/create', optionalAuth, createOrder);

// Get user's orders (members only)
router.get('/my-orders', protect, getUserOrders);

// Get all orders (admin only)
router.get('/all', getAllOrders);

// Get specific order details
router.get('/:orderId', optionalAuth, getOrderById);

// Update order status (admin only)
router.put('/update-status', protect, adminOnly, updateOrderStatus);

export default router;