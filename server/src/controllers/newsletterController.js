import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

// In newsletterController.js
export const createNewsletter = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { url, month, year } = req.body;

    // Validate required fields
    if (!url || !month || !year) {
      return res.status(400).json({ 
        message: "URL, month, and year are required" 
      });
    }

    // Check for PDF file - now it's in req.files.pdf[0]
    if (!req.files || !req.files.pdf || !req.files.pdf[0]) {
      return res.status(400).json({ 
        message: "PDF file is required" 
      });
    }

    const pdfFile = req.files.pdf[0];
    const coverImageFile = req.files.coverImage ? req.files.coverImage[0] : null;

    // Prepare newsletter data
    const newsletterData = {
      title: `${month} ${year} Newsletter`,
      url: url.trim(),
      month,
      year: parseInt(year),
      filePath: `/uploads/newsletters/${pdfFile.filename}`,
      originalName: pdfFile.originalname,
      mimeType: pdfFile.mimetype,
      size: pdfFile.size,
    };

    // Add cover image data if provided
    if (coverImageFile) {
      newsletterData.coverImagePath = `/uploads/newsletters/${coverImageFile.filename}`;
      newsletterData.coverImageOriginalName = coverImageFile.originalname;
      newsletterData.coverImageMimeType = coverImageFile.mimetype;
      newsletterData.coverImageSize = coverImageFile.size;
    }

    // Create newsletter
    const newsletter = new Newsletter(newsletterData);
    await newsletter.save();
    
    console.log("Newsletter saved successfully:", newsletter);
    
    res.status(201).json({ 
      message: "Newsletter uploaded successfully",
      newsletter 
    });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    
    // Clean up uploaded files if there was an error
    if (req.files) {
      if (req.files.pdf && req.files.pdf[0]) {
        const pdfPath = path.join(process.cwd(), "uploads/newsletters", req.files.pdf[0].filename);
        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }
      if (req.files.coverImage && req.files.coverImage[0]) {
        const imagePath = path.join(process.cwd(), "uploads/newsletters", req.files.coverImage[0].filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'unknown field';
      res.status(409).json({ 
        message: `There's an old database index causing conflicts. Please contact your database administrator to remove the '${field}' index.`,
        error: error.message 
      });
    } else {
      res.status(500).json({ 
        message: "Error creating newsletter", 
        error: error.message 
      });
    }
  }
};

// Get all newsletters
export const listNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find()
      .sort({ year: -1, month: -1, createdAt: -1 });
    
    res.json({ 
      newsletters,
      count: newsletters.length 
    });
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ 
      message: "Error fetching newsletters", 
      error: error.message 
    });
  }
};

// Get single newsletter by ID
export const getNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    
    if (!newsletter) {
      return res.status(404).json({ 
        message: "Newsletter not found" 
      });
    }
    
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({ 
      message: "Error fetching newsletter", 
      error: error.message 
    });
  }
};

// Update newsletter
export const updateNewsletter = async (req, res) => {
  try {
    const { url, month, year } = req.body;
    const updateData = {};

    if (url) updateData.url = url.trim();
    if (month) updateData.month = month;
    if (year) updateData.year = parseInt(year);
    
    // Update title if month or year changed
    if (month || year) {
      const newsletter = await Newsletter.findById(req.params.id);
      if (newsletter) {
        updateData.title = `${month || newsletter.month} ${year || newsletter.year} Newsletter`;
      }
    }

    const oldNewsletter = await Newsletter.findById(req.params.id);
    if (!oldNewsletter) {
      return res.status(404).json({ 
        message: "Newsletter not found" 
      });
    }

    // Handle PDF file update if new file is uploaded
    if (req.files && req.files.pdf && req.files.pdf[0]) {
      // Delete old PDF file
      if (oldNewsletter.filePath) {
        const oldFilePath = path.join(process.cwd(), oldNewsletter.filePath.replace(/^\//, ''));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      // Update with new PDF file info
      const pdfFile = req.files.pdf[0];
      updateData.filePath = `/uploads/newsletters/${pdfFile.filename}`;
      updateData.originalName = pdfFile.originalname;
      updateData.mimeType = pdfFile.mimetype;
      updateData.size = pdfFile.size;
    }

    // Handle cover image update if new file is uploaded
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
      // Delete old cover image file
      if (oldNewsletter.coverImagePath) {
        const oldImagePath = path.join(process.cwd(), oldNewsletter.coverImagePath.replace(/^\//, ''));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Update with new cover image file info
      const coverImageFile = req.files.coverImage[0];
      updateData.coverImagePath = `/uploads/newsletters/${coverImageFile.filename}`;
      updateData.coverImageOriginalName = coverImageFile.originalname;
      updateData.coverImageMimeType = coverImageFile.mimetype;
      updateData.coverImageSize = coverImageFile.size;
    }

    const updatedNewsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Newsletter updated successfully",
      newsletter: updatedNewsletter
    });
  } catch (error) {
    console.error("Error updating newsletter:", error);
    
    // Clean up uploaded files if there was an error
    if (req.files) {
      if (req.files.pdf && req.files.pdf[0]) {
        const pdfPath = path.join(process.cwd(), "uploads/newsletters", req.files.pdf[0].filename);
        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }
      if (req.files.coverImage && req.files.coverImage[0]) {
        const imagePath = path.join(process.cwd(), "uploads/newsletters", req.files.coverImage[0].filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
    
    res.status(500).json({ 
      message: "Error updating newsletter", 
      error: error.message 
    });
  }
};

// Delete newsletter
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    
    if (!newsletter) {
      return res.status(404).json({ 
        message: "Newsletter not found" 
      });
    }

    // Delete PDF file from server
    if (newsletter.filePath) {
      const filePath = path.join(process.cwd(), newsletter.filePath.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted PDF file:", filePath);
      }
    }

    // Delete cover image file from server
    if (newsletter.coverImagePath) {
      const imagePath = path.join(process.cwd(), newsletter.coverImagePath.replace(/^\//, ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted cover image file:", imagePath);
      }
    }

    await Newsletter.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: "Newsletter deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ 
      message: "Error deleting newsletter", 
      error: error.message 
    });
  }
};