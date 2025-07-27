import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const {
      leoStatus,
      userId,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password,
    } = req.body;

    // Validate required fields
    if (!leoStatus || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate member ID if leoStatus is 'member'
    if (leoStatus === "member" && (!userId || userId.trim() === "")) {
      return res.status(400).json({ message: "Member ID is required for LEO members" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      leoStatus,
      userId: leoStatus === "member" ? userId : null,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "1d" }
    );

    // Return token and user data, including leoStatus
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        leoStatus: user.leoStatus,   // <---- Add this line
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};