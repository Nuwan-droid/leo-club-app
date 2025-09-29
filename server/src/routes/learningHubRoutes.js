// backend/routes/learningHubRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { adminProtect } from '../middleware/authMiddleware.js';
import { getLessons, createLesson } from '../controllers/learningHubController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg,jpg,png), PDFs, and MP4s are allowed'));
    }
  }
});

router.route('/')
  .get(getLessons)
  .post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'source_file', maxCount: 1 }]), createLesson);

export default router;