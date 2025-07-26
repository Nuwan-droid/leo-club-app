import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import 'dotenv/config';



const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ;

// --------------------- SIGNUP ---------------------
router.post("/signup", async (req, res) => {
  try {
    const {
      leoStatus,
      memberId,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password,
    } = req.body;

    // ✅ Required field checks
    if (!email || !password || !leoStatus) {
      return res.status(400).json({ message: "Email, password, and leoStatus are required." });
    }

    if (leoStatus === "member" && (!memberId || memberId.trim() === "")) {
      return res.status(400).json({ message: "Member ID is required for members." });
    }

    // ✅ Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user
    const user = new User({
      leoStatus,
      memberId: leoStatus === "member" ? memberId : null,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// --------------------- LOGIN ---------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        leoStatus: user.leoStatus,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Send response
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        leoStatus: user.leoStatus,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

export default router;
