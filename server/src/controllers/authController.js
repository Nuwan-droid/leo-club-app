import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';  


// Signup Controller


const signup = async (req, res) => {
  try {
    const {
      leo_Id,
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password,
      role,
      adminRole, // Only for admin registrations
      admin_id, // Only for admin registrations
      position, // Only for admin registrations
    } = req.body;

    // ✅ Required field checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // ✅ Role-specific validation
    const userRole = role || "member"; // Default to member if not specified

    if (userRole === "member" && (!leo_Id || leo_Id.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Leo ID is required for members." });
    }

    if (userRole === "admin") {
      if (!adminRole) {
        return res
          .status(400)
          .json({ message: "Admin role is required for admin users." });
      }

      if (!admin_id) {
        return res
          .status(400)
          .json({ message: "Admin ID is required for admin users." });
      }

      if (!position || position.trim() === "") {
        return res
          .status(400)
          .json({ message: "Position is required for admin users." });
      }

      // Validate admin role
      const validAdminRoles = [
        "it_director",
        "membership_admin",
        "event_coordinator",
        "chief_editor",
        "treasurer",
      ];
      if (!validAdminRoles.includes(adminRole)) {
        return res
          .status(400)
          .json({ message: "Invalid admin role specified." });
      }
    }

    // ✅ Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // ✅ Check duplicate admin_id for admins
    if (userRole === "admin" && admin_id) {
      const existingAdmin = await User.findOne({ admin_id });
      if (existingAdmin) {
        return res.status(409).json({ message: "Admin ID already exists." });
      }
    }

    // ✅ Check duplicate leo_Id for members
    if (userRole === "member" && leo_Id) {
      const existingMember = await User.findOne({ leo_Id });
      if (existingMember) {
        return res.status(409).json({ message: "Leo ID already exists." });
      }
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user object based on role
    const userData = {
      firstName,
      lastName,
      address,
      birthday,
      email,
      mobile,
      password: hashedPassword,
      role: userRole,
    };

    // Add role-specific fields
    if (userRole === "member") {
      userData.leo_Id = leo_Id;
    } else if (userRole === "admin") {
      userData.admin_id = admin_id;
      userData.adminRole = adminRole;
      userData.position = position;
      userData.name = `${firstName} ${lastName}`; // Set full name for admins
    }

    // ✅ Save user
    const user = new User(userData);
    await user.save();

    // ✅ Auto-login after signup (optional - you can remove this if you want manual login)
    const token = generateToken(user._id, res);

    // ✅ Prepare response data (exclude sensitive information)
    const responseUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Add role-specific response data
    if (userRole === "member") {
      responseUser.leo_Id = user.leo_Id;
      responseUser.score = user.score;
      responseUser.eventsParticipated = user.eventsParticipated;
      responseUser.newsletterParticipated = user.newsletterParticipated;
    } else if (userRole === "admin") {
      responseUser.admin_id = user.admin_id;
      responseUser.adminRole = user.adminRole;
      responseUser.position = user.position;
      responseUser.permissions = user.permissions;
      responseUser.is_active = user.is_active;
    }

    res.status(201).json({
      message: `${
        userRole.charAt(0).toUpperCase() + userRole.slice(1)
      } registered successfully.`,
      token,
      user: responseUser,
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors,
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        message: `${field} already exists.`,
      });
    }

    res.status(500).json({ message: "Server error during signup." });
  }
};

// SignIn Controller
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

    // ✅ Check if admin is active (only for admins)
    if (user.role === "admin" && !user.is_active) {
      return res
        .status(401)
        .json({ message: "Account is deactivated. Please contact support." });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ✅ Create JWT token
    const token = generateToken(user._id, res);

    // ✅ Prepare response data based on user role
    const responseUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name || `${user.firstName} ${user.lastName}`,
      address: user.address,
      birthday: user.birthday,
      mobile: user.mobile,
      userImage: user.userImage,
    };

    // Add role-specific data
    if (user.role === "member") {
      responseUser.leo_Id = user.leo_Id;
      responseUser.score = user.score;
      responseUser.eventsParticipated = user.eventsParticipated;
      responseUser.newsletterParticipated = user.newsletterParticipated;
    } else if (user.role === "admin") {
      responseUser.admin_id = user.admin_id;
      responseUser.adminRole = user.adminRole;
      responseUser.position = user.position;
      responseUser.permissions = user.permissions;
      responseUser.is_active = user.is_active;
      responseUser.image_path = user.image_path;
    }

    // ✅ Send response
    res.json({
      message: "Login successful",
      token,
      user: responseUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error during login." });
  }
};


export default {
  signup,   
  signIn,
};  