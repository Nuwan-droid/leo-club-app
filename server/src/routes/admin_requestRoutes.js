// Updated Auth Routes (authRoutes) - Add admin routes if needed, but assuming separate admin routes file. For now, update as follows:
import express from "express";
import { getPendingRequests, approveUser, rejectUser } from "../controllers/adminRequestController.js"; // Import from adminController
import { isAdmin, hasPermission } from "../middleware/adminRequest.js"; 
import { adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --------------------- ADMIN REQUEST MANAGEMENT ---------------------

router.get("/pending-requests",adminProtect, isAdmin, hasPermission("requests_management"), getPendingRequests);
router.put("/approve/:userId",adminProtect, isAdmin, hasPermission("requests_management"), approveUser);
router.put("/reject/:userId",adminProtect, isAdmin, hasPermission("requests_management"), rejectUser);

export default router;