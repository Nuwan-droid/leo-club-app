<<<<<<< HEAD
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
=======
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89

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

<<<<<<< HEAD
=======
    // Validate required fields
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
    if (!leoStatus || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

<<<<<<< HEAD
    // Check if email already exists
=======
    // Check existing user
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

<<<<<<< HEAD
    // Check memberId only if leoStatus is 'member'
    if (leoStatus === 'member' && (!memberId || memberId.trim() === '')) {
=======
    // Validate member ID if leoStatus is 'member'
    if (leoStatus === "member" && (!userId || userId.trim() === "")) {
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
      return res.status(400).json({ message: "Member ID is required for LEO members" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

<<<<<<< HEAD
    // Create and save the new user
=======
    // Create new user
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
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
<<<<<<< HEAD
      status: 'pending', // new users need approval
=======
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
    });

    await newUser.save();

<<<<<<< HEAD
    // Generate token after saving (using newUser._id)
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User created successfully, awaiting admin approval",
      user: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        leoStatus: newUser.leoStatus,
        status: newUser.status,
      },
      token,
    });

=======
    res.status(201).json({ message: "User created successfully", user: newUser });
>>>>>>> 1ca627577843a7ae33fdb2e8d324e1011c9fae89
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN


export const signIn = async (req, res) => {
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