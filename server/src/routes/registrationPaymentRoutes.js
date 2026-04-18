import express from "express";
import {
  initiateRegistrationPayment,
  handleRegistrationNotification,

} from "../controllers/registrationPaymentController.js";


const router = express.Router();

// Initiate registration payment (visitor or member)
router.post("/initiate", initiateRegistrationPayment);

// PayHere IPN callback for registration
router.post("/payhere-notify", handleRegistrationNotification);

// Get registration payment status (authenticated users only)


export default router;
