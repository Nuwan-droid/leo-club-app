import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads/newsletters directory exists
// In your upload.js, update the directory creation:
const uploadsDir = path.join(process.cwd(), "uploads/newsletters");
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Created directory:", uploadsDir);
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}
// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});

// File filter - only allow PDFs and images
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "pdf" && file.mimetype === "application/pdf") {
    cb(null, true);
  } else if (file.fieldname === "coverImage" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const error = new Error(`Invalid file type for ${file.fieldname}`);
    error.code = "INVALID_FILE_TYPE";
    cb(error, false);
  }
};

// Multer upload
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
});

// Error handling middleware
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max 5MB." });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }

  if (err && err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};
