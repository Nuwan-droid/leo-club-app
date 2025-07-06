import User from '../models/User.js';

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

    // ✅ Check if required fields are provided
    if (!leoStatus || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Check memberId only if leoStatus is 'member'
    if (leoStatus === 'member' && (!memberId || memberId.trim() === '')) {
      return res.status(400).json({ message: "Member ID is required for LEO members" });
    }

    // 📦 Create and save the new user
    const newUser = new User({
      leoStatus,
      memberId: leoStatus === 'member' ? memberId : null,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password, // Optional: you can hash it before saving
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
