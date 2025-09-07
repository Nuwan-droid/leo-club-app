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
} from "../controllers/donationController.js";

const router = express.Router();

// Donation project routes
router.get("/", getAllDonationProjects);
router.get("/:id", getDonationProject);
router.post("/", addDonationProject);
router.put("/:id", updateDonationProject);
router.delete("/:id", removeDonationProject);

// Donation interaction routes
router.post("/:id/donate", updateDonationReceived);

// Check if donation project title already exists
router.post("/check-title", checkDonationProjectTitle);

// Upload route for donation project images
router.post("/upload", multiUpload, uploadDonationProjectImages);

export default router;
