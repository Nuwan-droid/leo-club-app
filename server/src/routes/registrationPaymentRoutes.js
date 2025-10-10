import express from "express";
import {
  initiateRegistrationPayment,
  handleRegistrationNotification,

} from "../controllers/registrationPaymentController.js";


const router = express.Router();


router.post("/initiate", initiateRegistrationPayment);


router.post("/payhere-notify", handleRegistrationNotification);




export default router;
