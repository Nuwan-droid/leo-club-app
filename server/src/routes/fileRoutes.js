import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadFile, getFiles, downloadFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/download/:filename", downloadFile);

export default router;
