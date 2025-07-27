import express from "express";
import "dotenv/config";
import { signup, signIn } from "../controllers/authController.js";

const router = express.Router();

// --------------------- SIGNUP ---------------------
router.post("/signup", signup);

// --------------------- SIGNIN ---------------------
router.post("/login", signIn);

export default router;
