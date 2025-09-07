import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user details
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status !== "approved") {
      return res.status(403).json({ message: "Awaiting admin approval" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get total members count
router.get("/members/count", async (req, res) => {
  try {
    // If you store members with role = "member"
    const count = await User.countDocuments({ role: "member" });

    // If you store them differently (e.g., all approved users)
    // const count = await User.countDocuments({ status: "approved" });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching members count:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
