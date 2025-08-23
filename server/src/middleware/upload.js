// src/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './upload/images';
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

const multiUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
  { name: 'sliderImages', maxCount: 10 }
]);

export { upload, multiUpload, uploadDir };