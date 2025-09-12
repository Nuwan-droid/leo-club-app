import express from "express";
import { multiUpload } from "../middleware/upload.js";
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
} from "../controllers/donationController.js";

const router = express.Router();

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
