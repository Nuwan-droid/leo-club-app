import User from "../models/User.js";
import InactiveUser from "../models/InactiveUser.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();



// me-------------------------------------------------

const me = async (req, res) => {
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
};



// getUser profile-------------------------------------------------

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
      adminRole: user.adminRole,
      profilePic: user.userImage,
      score: user.score,
      maxScore: 100,
      isActive: user.is_active,
      events: user.eventsParticipated,
      newsletter: user.newsletterParticipated,
    });
  } catch (err) {
    console.error("❌ JWT Verify error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};



//------getmembercount------------------------------------------

const getMemberCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "member" });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching member count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      message: "Users extracted successfully",
      users: users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};




//--------Toglle user active/inactive status----------------------------
const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Attempting to toggle status for user:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Current user status:", user.is_active);

    user.is_active = !user.is_active;
    
    const updatedUser = await user.save();
    
    console.log("User status updated successfully:", {
      userId: userId,
      newStatus: updatedUser.is_active,
      email: updatedUser.email
    });

    res.status(200).json({
      message: `User ${updatedUser.is_active ? "activated" : "deactivated"} successfully`,
      user: updatedUser
    });

  } catch (err) {
    console.error("Error in toggleUserStatus:", err);
    res.status(500).json({ 
      message: "Failed to toggle user status"
    });
  }
};



//----------------------Deactivate user - IMPROVED VERSION---------------------------
const inactivateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { reason } = req.body; // Optional reason for deactivation
    
    console.log("=== DEACTIVATE USER DEBUG START ===");
    console.log("🆔 Deactivating user with ID:", userId);
    console.log("📝 Reason:", reason);

    // Find the active user
    const activeUser = await User.findById(userId);
    if (!activeUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Found active user:", {
      id: activeUser._id,
      email: activeUser.email,
      name: activeUser.name,
      role: activeUser.role
    });

    // Check if already inactive
    const existingInactive = await InactiveUser.findOne({ originalUserId: userId });
    if (existingInactive) {
      return res.status(409).json({ message: "User is already inactive" });
    }

    // Create inactive user record with ALL user data
    console.log("📦 Creating comprehensive inactive user record...");
    const inactiveUserData = {
      originalUserId: activeUser._id,
      
      // Copy ALL fields from active user
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      name: activeUser.name,
      email: activeUser.email,
      role: activeUser.role,
      userImage: activeUser.userImage,
      password: activeUser.password, // Store password hash for seamless reactivation
      
      // Admin-specific fields
      position: activeUser.position,
      adminRole: activeUser.adminRole,
      permissions: activeUser.permissions,
      admin_id: activeUser.admin_id,
      image_path: activeUser.image_path,
      
      // Member-specific fields
      score: activeUser.score,
      eventsParticipated: activeUser.eventsParticipated,
      newsletterParticipated: activeUser.newsletterParticipated,
      
      // Other fields
      leo_Id: activeUser.leo_Id,
      address: activeUser.address,
      birthday: activeUser.birthday,
      mobile: activeUser.mobile,
      enrollmentNo: activeUser.enrollmentNo,
      
      // Deactivation metadata
      reason: reason || "Manual deactivation",
      deactivatedBy: req.user?._id, // If you have auth middleware
      deactivationDate: new Date(),
      originalCreatedAt: activeUser.createdAt,
    };

    const inactiveUser = new InactiveUser(inactiveUserData);
    await inactiveUser.save();
    console.log("✅ Created inactive user record:", inactiveUser._id);

    // Remove from active users
    console.log("🗑️ Removing user from active collection...");
    await User.findByIdAndDelete(userId);
    console.log("✅ Successfully removed active user");

    console.log("🎉 User deactivation completed successfully");
    console.log("=== DEACTIVATE USER DEBUG END ===");

    res.status(200).json({
      message: "User deactivated successfully",
      inactiveUser: {
        _id: inactiveUser._id,
        originalUserId: inactiveUser.originalUserId,
        email: inactiveUser.email,
        name: inactiveUser.name,
        reason: inactiveUser.reason,
        deactivationDate: inactiveUser.deactivationDate
      }
    });

  } catch (err) {
    console.error("❌ Error deactivating user:", err);
    res.status(500).json({ 
      message: "Failed to deactivate user",
      error: process.env.NODE_ENV === 'development' ? err.message : "Internal server error"
    });
  }
};


// -------Get all inactive users------------------------------

const getInactiveUsers = async (req, res) => {
  try {
    const inactiveUsers = await InactiveUser.find();
    res.status(200).json({
      message: "Inactive users retrieved successfully",
      users: inactiveUsers
    });
  } catch (error) {
    console.error("Error fetching inactive users:", error);
    res.status(500).json({ message: "Error fetching inactive users" });
  }
};

const reactivateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("=== REACTIVATE USER DEBUG START ===");
    console.log("🆔 Received userId:", userId);

    console.log("🔍 Searching for inactive user with originalUserId:", userId);
    const inactiveUser = await InactiveUser.findOne({ originalUserId: userId });
    
    if (!inactiveUser) {
      console.log("❌ Inactive user not found with originalUserId:", userId);
      return res.status(404).json({ message: "Inactive user not found" });
    }

    console.log("✅ Found inactive user:", {
      id: inactiveUser._id,
      email: inactiveUser.email,
      firstName: inactiveUser.firstName,
      lastName: inactiveUser.lastName,
      originalUserId: inactiveUser.originalUserId,
      role: inactiveUser.role,
      enrollmentNo: inactiveUser.enrollmentNo,
    });

    console.log("🔍 Checking if active user with email already exists:", inactiveUser.email);
    const existingActiveUser = await User.findOne({ email: inactiveUser.email });
    if (existingActiveUser) {
      console.log("❌ Active user with this email already exists:", existingActiveUser._id);
      return res.status(409).json({
        message: "A user with this email is already active",
      });
    }

    if (inactiveUser.enrollmentNo && inactiveUser.enrollmentNo !== null) {
      const existingUserWithEnrollmentNo = await User.findOne({ enrollmentNo: inactiveUser.enrollmentNo });
      if (existingUserWithEnrollmentNo) {
        console.log("❌ Active user with enrollmentNo already exists:", inactiveUser.enrollmentNo);
        return res.status(409).json({
          message: `A user with enrollmentNo '${inactiveUser.enrollmentNo}' already exists`,
        });
      }
    }

    const isAdmin = inactiveUser.role === 'admin';
    const isMember = inactiveUser.role === 'member';

    const reactivatedUserData = {
      email: inactiveUser.email,
      password: "TempPassword123!",
      role: inactiveUser.role || "member",
      firstName: inactiveUser.firstName || "",
      lastName: inactiveUser.lastName || "",
      name: inactiveUser.name || `${inactiveUser.firstName || ""} ${inactiveUser.lastName || ""}`.trim(),
      userImage: inactiveUser.userImage || undefined,
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrollmentNo: inactiveUser.enrollmentNo && inactiveUser.enrollmentNo !== null ? inactiveUser.enrollmentNo : undefined,
    };

    if (isAdmin) {
      console.log("👑 Setting up admin-specific fields...");
      reactivatedUserData.position = inactiveUser.position || "General Admin";
      reactivatedUserData.adminRole = inactiveUser.adminRole || "membership_admin";
      reactivatedUserData.permissions = inactiveUser.permissions && inactiveUser.permissions.length > 0
        ? inactiveUser.permissions
        : ["manage_about", "dashboard", "learning_hub"];
      reactivatedUserData.score = undefined;
      reactivatedUserData.eventsParticipated = undefined;
      reactivatedUserData.newsletterParticipated = undefined;
      reactivatedUserData.admin_id = inactiveUser.admin_id || undefined;
      reactivatedUserData.image_path = inactiveUser.image_path || undefined;
    }

    if (isMember) {
      console.log("👤 Setting up member-specific fields...");
      reactivatedUserData.score = inactiveUser.score || 0;
      reactivatedUserData.eventsParticipated = inactiveUser.eventsParticipated || 0;
      reactivatedUserData.newsletterParticipated = inactiveUser.newsletterParticipated || 0;
      reactivatedUserData.position = undefined;
      reactivatedUserData.adminRole = undefined;
      reactivatedUserData.permissions = [];
      reactivatedUserData.admin_id = undefined;
      reactivatedUserData.image_path = undefined;
    }

    reactivatedUserData.leo_Id = inactiveUser.leo_Id || undefined;
    reactivatedUserData.address = inactiveUser.address || undefined;
    reactivatedUserData.birthday = inactiveUser.birthday || undefined;
    reactivatedUserData.mobile = inactiveUser.mobile || undefined;

    console.log("📋 Final user data to save:", {
      ...reactivatedUserData,
      password: "[HIDDEN]",
    });

    console.log("💾 Attempting to save reactivated user...");
    const reactivatedUser = new User(reactivatedUserData);
    const savedUser = await reactivatedUser.save();
    console.log("✅ Successfully saved reactivated user:", {
      id: savedUser._id,
      email: savedUser.email,
      role: savedUser.role,
      name: savedUser.name,
      enrollmentNo: savedUser.enrollmentNo,
    });

    console.log("🗑️ Removing user from inactive collection...");
    const deleteResult = await InactiveUser.deleteOne({ originalUserId: userId });
    console.log("✅ Delete result:", deleteResult);

    console.log("🎉 User reactivation completed successfully");
    console.log("=== REACTIVATE USER DEBUG END ===");

    res.status(200).json({
      message: "User reactivated successfully. Please ask the user to reset their password.",
      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
        is_active: savedUser.is_active,
        name: savedUser.name,
        enrollmentNo: savedUser.enrollmentNo,
      },
    });
  } catch (err) {
    console.error("=== REACTIVATION ERROR DETAILS START ===");
    console.error("❌ Error reactivating user:", err);
    console.error("Error message:", err.message);
    console.error("Error name:", err.name);
    console.error("Error code:", err.code);
    
    if (err.code === 11000) {
      console.error("🔍 Duplicate key error details:", err.keyValue);
      console.error("🔍 Duplicate key pattern:", err.keyPattern);
      let field = Object.keys(err.keyValue)[0];
      let value = Object.values(err.keyValue)[0];
      return res.status(409).json({
        message: `A user with ${field} '${value}' already exists`,
      });
    }

    if (err.name === 'ValidationError') {
      console.error("🔍 Validation errors:");
      const validationErrors = [];
      Object.keys(err.errors).forEach(field => {
        const error = err.errors[field];
        console.error(`  - Field: ${field}`);
        console.error(`    Kind: ${error.kind}`);
        console.error(`    Message: ${error.message}`);
        console.error(`    Value: ${error.value}`);
        validationErrors.push({
          field: field,
          kind: error.kind,
          message: error.message,
          value: error.value,
        });
      });
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    if (err.name === 'CastError') {
      console.error("🔍 Cast error:", err.message);
      return res.status(400).json({
        message: `Invalid ${err.path}: ${err.value}`,
      });
    }

    console.error("Full error object:", err);
    console.error("=== REACTIVATION ERROR DETAILS END ===");
    
    res.status(500).json({
      message: "Failed to reactivate user",
      error: process.env.NODE_ENV === 'development' ? err.message : "Internal server error",
    });
  }
};



export default { 
  me, 
  getUserProfile, 
  getMemberCount, 
  getAllUsers, 
  toggleUserStatus,
  inactivateUser,
  getInactiveUsers,
  reactivateUser
};