import User from "../models/User.js"; // Adjust path as needed

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin" || !req.user.is_active) {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  next();
};

// Middleware to check specific permission
const hasPermission = (permission) => (req, res, next) => {
  if (!req.user || req.user.role !== "admin" || !req.user.hasPermission(permission)) {
    return res.status(403).json({ message: `Access denied. Missing permission: ${permission}` });
  }
  next();
};


export { isAdmin, hasPermission };