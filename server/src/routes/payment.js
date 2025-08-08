

import express from 'express';
import { handlePayHereNotification } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payhere-notify', handlePayHereNotification);

export default router;
