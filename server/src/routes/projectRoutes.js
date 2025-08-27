// Fixed projectRoutes.js
import express from "express";
import { multiUpload } from "../middleware/upload.js";
import {
  getAllProjects,
  addProject,
  updateProject,
  removeProject,
  uploadImages,
} from "../controllers/projectController.js";
import Project from "../models/Project.js";

const router = express.Router();

// Project routes
router.get("/allprojects", getAllProjects);
router.post("/addproject", addProject);
router.post("/updateproject", updateProject);
router.post("/removeproject", removeProject);

// Check if project title already exists
router.post("/check-title", async (req, res) => {
  const { title } = req.body;

  try {
    const existingProject = await Project.findOne({ title: title.trim() });

    if (existingProject) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Title check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ FIXED: Upload route now matches frontend URL (/upload)
router.post("/upload", multiUpload, uploadImages);

export default router;