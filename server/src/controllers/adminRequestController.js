import User from "../models/User.js";

// Get all pending user requests
const getPendingRequests = async (req, res) => {
  try {
    const pendingUsers = await User.findPendingUsers();

    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res
      .status(500)
      .json({ message: "Server error fetching pending requests." });
  }
};

// Approve a user request
const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { leo_Id } = req.body; // Admin assigns leo_Id

    if (!leo_Id) {
      return res
        .status(400)
        .json({ message: "Leo ID is required for approval." });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "member" || user.status !== "pending") {
      return res.status(404).json({ message: "Pending member not found." });
    }

    // Check if leo_Id is unique
    const existing = await User.findOne({ leo_Id });
    if (existing) {
      return res.status(409).json({ message: "Leo ID already exists." });
    }

    user.leo_Id = leo_Id;
    user.status = "approved";
    user.is_active = true;
    await user.save();

    // TODO: Send email notification to user about approval

    res.status(200).json({ message: "User approved successfully.", user });
  } catch (error) {
    console.error("Approval error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({ message: "Server error during approval." });
  }
};

// Reject a user request
const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.role !== "member" || user.status !== "pending") {
      return res.status(404).json({ message: "Pending member not found." });
    }

    user.status = "rejected";
    user.is_active = false;
    await user.save();

    // Optionally, delete the user: await user.deleteOne();
    // TODO: Send email notification to user about rejection

    res.status(200).json({ message: "User rejected successfully." });
  } catch (error) {
    console.error("Rejection error:", error);
    res.status(500).json({ message: "Server error during rejection." });
  }
};

export { getPendingRequests, approveUser, rejectUser };
