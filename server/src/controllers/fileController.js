import File from "../models/File.js";
import path from "path";
import fs from "fs";

// ✅ Upload File Controller
export const uploadFile = async (req, res) => {
  try {
    const { month, year, viewUrl } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      month,
      year,
      imageSrc: `/upload/pdfs/${req.file.filename.replace(".pdf", ".jpg")}`,
      viewUrl, 
    });

    await file.save();
    res.status(201).json({ message: "PDF uploaded successfully", file });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// ✅ Get All Files
export const getFiles = async (req, res) => {
  try {
    const files = await File.find({}, {
      filename: 1,
      path: 1,
      mimetype: 1,
      size: 1,
      month: 1,
      year: 1,
      imageSrc: 1,
      viewUrl: 1,
      createdAt: 1,
      updatedAt: 1
    }).sort({ year: -1, month: -1 }); 

    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
};


// ✅ Download File
export const downloadFile = (req, res) => {
  const filepath = path.join("upload", req.params.filename);
  if (fs.existsSync(filepath)) {
    res.download(filepath, (err) => {
      if (err) {
        res.status(500).json({ message: "Error downloading file", error: err.message });
      }
    });
  } else {
    res.status(404).json({ message: "File not found" });
  }
};
