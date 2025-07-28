import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
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
      return res
        .status(400)
        .json({ message: "Email, password, and leoStatus are required." });
    }

    if (leoStatus === "member" && (!memberId || memberId.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Member ID is required for members." });
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

    // ✅ Auto-login after signup (optional - you can remove this if you want manual login)
    const token = generateToken(user._id, res);

    res.status(201).json({
      message: "User registered successfully.",
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
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // ✅ Validate fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
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
    const token = generateToken(user._id, res);

    // ✅ Send response
    res.json({
      message: "Login successful",
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
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error during login." });
  }
};

// ✅ Fixed export - use named exports instead of default object
export { signup, signIn };
