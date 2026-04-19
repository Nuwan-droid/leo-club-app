// src/config/upload.js 
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ Use /tmp for Vercel (ONLY writable location)
const uploadDir = '/tmp/upload/images';
const receiptDir = '/tmp/upload/receipts';
const profileDir = '/tmp/upload/profiles';
const eventDir = '/tmp/upload/events';

// ✅ Safe directory creation
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

createDir(uploadDir);
createDir(receiptDir);
createDir(profileDir);
createDir(eventDir);

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

// Profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) =>
    cb(null, `profile_${Date.now()}${path.extname(file.originalname)}`)
});

// Event images
const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, eventDir),
  filename: (req, file, cb) =>
    cb(null, `event_${Date.now()}${path.extname(file.originalname)}`)
});

// File filter for receipts
const receiptFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error('Only JPG, PNG, and PDF files are allowed for receipts'));
};

// File filter for profile images
const profileFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error('Only JPG and PNG files are allowed for profile images'));
};

// File filter for event images
const eventFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error('Only JPG and PNG files are allowed for event cover images'));
};

const upload = multer({ storage });

// Multi-field upload
const multiUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
  { name: 'sliderImages', maxCount: 10 }
]);

// Receipt upload
const receiptUpload = multer({
  storage: receiptStorage,
  fileFilter: receiptFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('files');

// Profile upload
const profileUpload = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('profilePic');

// Event upload
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