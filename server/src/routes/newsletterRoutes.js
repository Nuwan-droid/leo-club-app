// In newsletterRoutes.js
import express from "express";
import { upload, handleMulterError } from "../config/upload.js";
import {
  createNewsletter,
  listNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// POST /api/newsletters - Create new newsletter
// Change from upload.single("pdf") to upload.fields()
router.post("/", upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), createNewsletter);

// GET /api/newsletters - Get all newsletters
router.get("/", listNewsletters);

// GET /api/newsletters/:id - Get single newsletter
router.get("/:id", getNewsletter);

// PUT /api/newsletters/:id - Update newsletter
router.put("/:id", upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), updateNewsletter);

// DELETE /api/newsletters/:id - Delete newsletter
router.delete("/:id", deleteNewsletter);

export default router;