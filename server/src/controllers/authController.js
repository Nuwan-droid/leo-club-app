import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
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

    if (!leoStatus || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check memberId only if leoStatus is 'member'
    if (leoStatus === 'member' && (!memberId || memberId.trim() === '')) {
      return res.status(400).json({ message: "Member ID is required for LEO members" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      leoStatus,
      memberId: leoStatus === 'member' ? memberId : null,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password: hashedPassword,
      status: 'pending', // new users need approval
    });

    await newUser.save();

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

  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
