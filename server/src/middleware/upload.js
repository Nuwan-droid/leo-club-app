// src/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './upload/images';
const receiptDir = './upload/receipts';

// Create directories if they don't exist
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(receiptDir, { recursive: true });

// Storage configuration for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});

// Storage configuration for donation receipts
const receiptStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, receiptDir),
  filename: (req, file, cb) =>
    cb(null, `receipt_${Date.now()}_${Math.random().toString(36).substring(2)}${path.extname(file.originalname)}`)
});

// File filter for receipts (JPG, PNG, PDF)
const receiptFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, and PDF files are allowed for receipts'));
  }
};

const upload = multer({ storage });

// Multi-field upload for project images
const multiUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
  { name: 'sliderImages', maxCount: 10 }
]);

// Single file upload for donation receipts
const receiptUpload = multer({
  storage: receiptStorage,
  fileFilter: receiptFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).single('files'); // This matches the field name from frontend

export { upload, multiUpload, receiptUpload, uploadDir, receiptDir };