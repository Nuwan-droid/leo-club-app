import express from 'express';
import {
  initiatePayHerePayment,
  handlePayHereNotification,
  getPaymentStatus
} from '../controllers/paymentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initialize payment (supports both member and visitor)
// Uses optionalAuth to detect if user is logged in (member) or not (visitor)
router.post('/payhere-init', optionalAuth, initiatePayHerePayment);

// Handle PayHere payment notification (webhook)
router.post('/payhere-notify', handlePayHereNotification);

// Get payment status for an order
router.get('/status/:orderId', optionalAuth, getPaymentStatus);

export default router;