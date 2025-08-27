import express from "express";
import "dotenv/config";
import authController from "../controllers/authController.js";

const router = express.Router();

// --------------------- SIGNUP ---------------------
router.post("/signup", authController.signup);

// --------------------- SIGNIN ---------------------
router.post("/signIn", authController.signIn);

export default router;