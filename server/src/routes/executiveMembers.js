import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ExecutiveMember from '../models/executive_members.js';

const router = express.Router();

// Get current directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../upload/images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// GET all executive members
router.get('/', async (req, res) => {
  try {
    const members = await ExecutiveMember.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching executive members',
      error: error.message
    });
  }
});

// GET single executive member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await ExecutiveMember.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Executive member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching executive member',
      error: error.message
    });
  }
});

// POST create new executive member with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      email,
      first_name,
      last_name,
      member_id,
      phone,
      position
    } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Check if member with same email or member_id already exists
    const existingMember = await ExecutiveMember.findOne({
      $or: [{ email }, { member_id }]
    });

    if (existingMember) {
      // Delete uploaded file if member already exists
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Executive member with this email or member ID already exists'
      });
    }

    // Generate image path for storage
    const image_path = `/images/${req.file.filename}`;

    const newMember = new ExecutiveMember({
      email,
      first_name,
      last_name,
      member_id,
      phone,
      position,
      image_path
    });

    const savedMember = await newMember.save();

    res.status(201).json({
      success: true,
      message: 'Executive member created successfully',
      data: savedMember
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({
      success: false,
      message: 'Error creating executive member',
      error: error.message
    });
  }
});

// PUT update executive member with optional image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      email,
      first_name,
      last_name,
      member_id,
      phone,
      position
    } = req.body;

    // Check if member exists
    const existingMember = await ExecutiveMember.findById(req.params.id);
    if (!existingMember) {
      // Delete uploaded file if member doesn't exist
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Executive member not found'
      });
    }

    // Check if email or member_id is being changed to one that already exists
    if (email !== existingMember.email || member_id !== existingMember.member_id) {
      const duplicateMember = await ExecutiveMember.findOne({
        $and: [
          { _id: { $ne: req.params.id } },
          { $or: [{ email }, { member_id }] }
        ]
      });

      if (duplicateMember) {
        // Delete uploaded file if duplicate found
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: 'Another executive member with this email or member ID already exists'
        });
      }
    }

    // Prepare update data
    const updateData = {
      email,
      first_name,
      last_name,
      member_id,
      phone,
      position
    };

    // If new image is uploaded, update image path and delete old image
    if (req.file) {
      // Delete old image file
      const oldImagePath = path.join(__dirname, '../../', existingMember.image_path);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      
      updateData.image_path = `/images/${req.file.filename}`;
    }

    const updatedMember = await ExecutiveMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Executive member updated successfully',
      data: updatedMember
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({
      success: false,
      message: 'Error updating executive member',
      error: error.message
    });
  }
});

// DELETE executive member
router.delete('/:id', async (req, res) => {
  try {
    const member = await ExecutiveMember.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Executive member not found'
      });
    }

    // Delete associated image file
    const imagePath = path.join(__dirname, '../../', member.image_path);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await ExecutiveMember.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Executive member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting executive member',
      error: error.message
    });
  }
});

// GET members by position
router.get('/position/:position', async (req, res) => {
  try {
    const members = await ExecutiveMember.find({ 
      position: { $regex: req.params.position, $options: 'i' } 
    });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching members by position',
      error: error.message
    });
  }
});

export default router;
