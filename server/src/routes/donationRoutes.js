import express from "express";
import { multiUpload, receiptUpload } from "../middleware/upload.js";
import { protect, optionalAuth, adminOnly } from "../middleware/authMiddleware.js";
import Donation from "../models/Donation.js";
import {
  getAllDonationProjects,
  getDonationProject,
  addDonationProject,
  updateDonationProject,
  removeDonationProject,
  updateDonationReceived,
  checkDonationProjectTitle,
  uploadDonationProjectImages,
  addDonationItem,
  getAllDonationItems,
  getDonationItemsByProject,
  updateDonationItemStatus,
  deleteDonationItem,
  // New donation functionality
  createDonation,
  initiateDonationPayment,
  handleDonationPaymentNotification,
  uploadDonationReceipt,
  getAllDonations,
  getUserDonations,
  verifyDonation
} from "../controllers/donationController.js";

const router = express.Router();

// ======================== DONATION PAYMENT ROUTES ========================
// New donation system routes

// Create donation record (optionally authenticated)
router.post("/donate", optionalAuth, createDonation);

// Initiate payment for donation
router.post("/payment/initiate", initiateDonationPayment);

// PayHere notification endpoint
router.post("/payment-notify", handleDonationPaymentNotification);

// Upload receipt for bank transfers
router.post("/receipt/upload", receiptUpload, uploadDonationReceipt);

// Get all donations (no auth for testing)
router.get("/donations", getAllDonations);

// Test route to check if donations API is working
router.get("/test", (req, res) => {
  res.json({ message: "Donations API is working!", timestamp: new Date().toISOString() });
});

// Test route to check donation count (no auth required)
router.get("/count", async (req, res) => {
  try {
    const count = await Donation.countDocuments();
    res.json({ 
      message: "Donation count retrieved successfully", 
      count: count,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error counting donations", 
      error: error.message 
    });
  }
});

// Get user's donations (authenticated users)
router.get("/donations/my", protect, getUserDonations);

// Verify donation (no auth for testing)
router.patch("/donations/:id/verify", verifyDonation);

// Delete donation (no auth for testing)  
router.delete("/donations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByIdAndDelete(id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }
    
    res.json({
      success: true,
      message: "Donation deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting donation",
      error: error.message
    });
  }
});

// ======================== DONATION ITEMS ROUTES ========================
// Place these before the generic /:id route to avoid conflicts

// Donation items routes
router.post("/items", addDonationItem);                    // POST /api/donation-projects/items
router.get("/items", getAllDonationItems);                 // GET /api/donation-projects/items
router.get("/items/:projectId", getDonationItemsByProject); // GET /api/donation-projects/items/:projectId
router.put("/items/:id/status", updateDonationItemStatus); // PUT /api/donation-projects/items/:id/status
router.delete("/items/:id", deleteDonationItem);           // DELETE /api/donation-projects/items/:id

// Check if donation project title already exists
router.post("/check-title", checkDonationProjectTitle);

// Upload route for donation project images
router.post("/upload", multiUpload, uploadDonationProjectImages);

// Donation project routes
router.get("/", getAllDonationProjects);
router.get("/:id", getDonationProject);
router.post("/", addDonationProject);
router.put("/:id", updateDonationProject);
router.delete("/:id", removeDonationProject);

// Donation interaction routes
router.post("/:id/donate", updateDonationReceived);

export default router;
