import express from 'express';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  completeOrder  // Keep this for manual order completion if needed
} from '../controllers/orderController.js';
import { protect, optionalAuth, adminOnly } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order (supports both member and visitor)
router.post('/create', optionalAuth, createOrder);

// Complete order after successful payment (public endpoint for payment gateway callbacks)
router.post('/complete', completeOrder);

// Get user's orders (members only)
router.get('/my-orders', protect, getUserOrders);

// Get all orders (admin only)
router.get('/all', getAllOrders);

// Debug endpoint to check order status by order_id (for testing)
router.get('/debug/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOne({ order_id });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found",
        order_id 
      });
    }

    return res.json({
      success: true,
      order: {
        id: order._id,
        order_id: order.order_id,
        customer: order.customer,
        payment_status: order.payment.status,
        order_status: order.orderStatus,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
        items_count: order.items.length,
        total_amount: order.payment.amount
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Get specific order details
router.get('/:orderId', optionalAuth, getOrderById);

// Update order status (admin only)
router.put('/update-status', protect, adminOnly, updateOrderStatus);

export default router;