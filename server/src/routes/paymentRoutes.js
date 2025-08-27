import express from "express";
import { initiatePayHerePayment, handlePayHereNotification } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payhere-init", initiatePayHerePayment);      // generate hash
router.post("/payhere-notify", handlePayHereNotification); // handle callback

export default router;
