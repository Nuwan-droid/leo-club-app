// src/config/upload.js 
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './upload/images';
const receiptDir = './upload/receipts';
const profileDir = './upload/profiles';
const eventDir = './upload/events'; // ✅ new directory for event cover images

// Create directories if they don't exist
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(receiptDir, { recursive: true });
fs.mkdirSync(profileDir, { recursive: true });
fs.mkdirSync(eventDir, { recursive: true }); // ✅ ensure event folder exists

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

// ✅ Storage configuration for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) =>
    cb(null, `profile_${Date.now()}${path.extname(file.originalname)}`)
});

// ✅ Storage configuration for event cover images
const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, eventDir),
  filename: (req, file, cb) =>
    cb(null, `event_${Date.now()}${path.extname(file.originalname)}`)
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

// File filter for profile images (JPG/PNG only)
const profileFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed for profile images'));
  }
};

// ✅ File filter for event cover images (JPG/PNG only)
const eventFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed for event cover images'));
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
}).single('files');

// Profile picture upload
const profileUpload = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('profilePic');

// ✅ Event cover image upload
const eventUpload = multer({
  storage: eventStorage,
  fileFilter: eventFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('coverImage');

// Error handler
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

export { 
  upload, 
  multiUpload, 
  receiptUpload, 
  uploadDir, 
  receiptDir, 
  profileUpload, 
  profileDir,
  eventUpload,
  eventDir
};