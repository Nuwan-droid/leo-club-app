import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status !== "approved") {
      return res.status(403).json({ message: "Awaiting admin approval" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ User not found for id:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      role: user.role,
      profilePic: user.userImage,
      score: user.score,
      maxScore: 100,
      events: user.eventsParticipated,
      newsletter: user.newsletterParticipated,
    });
  } catch (err) {
    console.error("❌ JWT Verify error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default { me, getUserProfile };
