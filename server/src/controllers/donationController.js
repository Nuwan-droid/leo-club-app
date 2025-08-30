import mongoose from "mongoose";
import DonationProject from "../models/DonationProject.js";

// Get all donation projects
export const getAllDonationProjects = async (req, res) => {
  try {
    const projects = await DonationProject.find({}).sort({ donation_project_id: 1 });
    
    console.log("All Donation Projects fetched");
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching donation projects:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single donation project
export const getDonationProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    let project = null;
    
    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      project = await DonationProject.findById(id);
    } else {
      // Try to parse as a number for custom donation_project_id field
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        project = await DonationProject.findOne({ donation_project_id: numericId });
      }
    }
    
    if (!project) {
      return res.status(404).json({ success: false, message: "Donation project not found" });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching donation project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new donation project
export const addDonationProject = async (req, res) => {
  try {
    // Find projects that have a valid numeric donation_project_id field
    const projects = await DonationProject.find({ donation_project_id: { $type: "number" } })
      .sort({ donation_project_id: -1 })
      .limit(1);

    let nextId = 1; // Default starting ID

    if (projects.length > 0 && projects[0].donation_project_id && !isNaN(projects[0].donation_project_id)) {
      nextId = projects[0].donation_project_id + 1;
    }

    console.log("Generated next donation project ID:", nextId);

    const donationProject = new DonationProject({
      donation_project_id: nextId,
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      location: req.body.location,
      city: req.body.city,
      image_path: req.body.image_path,
      donation_items: {
        books: {
          required: req.body.books || 0,
          received: 0
        },
        pens: {
          required: req.body.pens || 0,
          received: 0
        },
        clothes: {
          required: req.body.clothes || 0,
          received: 0
        }
      }
    });

    await donationProject.save();
    console.log("Saved donation project with ID:", nextId);
    res.json({ success: true, message: "Donation project created successfully", data: donationProject });
  } catch (error) {
    console.error("Error adding donation project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update donation project
export const updateDonationProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, start_date, end_date, location, city, image_path, books, pens, clothes } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const updateData = {
      title,
      description,
      start_date,
      end_date,
      location,
      city,
      image_path,
      donation_items: {
        books: {
          required: books || 0,
          received: 0 // Keep existing received count or reset as needed
        },
        pens: {
          required: pens || 0,
          received: 0
        },
        clothes: {
          required: clothes || 0,
          received: 0
        }
      }
    };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined || updateData[key] === "") {
        delete updateData[key];
      }
    });

    let result = null;

    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      console.log("Updating donation project by MongoDB _id:", id);
      result = await DonationProject.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      // Try to parse as a number for custom donation_project_id field
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        console.log("Updating donation project by custom id:", numericId);
        result = await DonationProject.findOneAndUpdate({ donation_project_id: numericId }, updateData, {
          new: true,
        });
      } else {
        return res.status(400).json({ success: false, message: "Invalid project ID format" });
      }
    }

    if (result) {
      console.log("Successfully updated donation project:", id);
      res.json({
        success: true,
        message: "Donation project updated successfully",
        data: result,
      });
    } else {
      console.log("Donation project not found with ID:", id);
      res.status(404).json({ success: false, message: "Donation project not found" });
    }
  } catch (error) {
    console.error("Error updating donation project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove donation project
export const removeDonationProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    let result = null;

    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      console.log("Deleting donation project by MongoDB _id:", id);
      result = await DonationProject.findByIdAndDelete(id);
    } else {
      // Try to parse as a number for custom donation_project_id field
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        console.log("Deleting donation project by custom id:", numericId);
        result = await DonationProject.findOneAndDelete({ donation_project_id: numericId });
      } else {
        return res.status(400).json({ success: false, message: "Invalid project ID format" });
      }
    }

    if (result) {
      console.log("Successfully removed donation project:", id);
      res.json({
        success: true,
        message: "Donation project deleted successfully",
      });
    } else {
      console.log("Donation project not found with ID:", id);
      res.status(404).json({ success: false, message: "Donation project not found" });
    }
  } catch (error) {
    console.error("Error removing donation project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update donation received (for when someone donates)
export const updateDonationReceived = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemType, quantity = 1 } = req.body;

    if (!id || !itemType) {
      return res.status(400).json({ 
        success: false, 
        message: "Project ID and item type are required" 
      });
    }

    if (!['books', 'pens', 'clothes'].includes(itemType)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid item type. Must be 'books', 'pens', or 'clothes'" 
      });
    }

    let project = null;
    
    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      project = await DonationProject.findById(id);
    } else {
      // Try to parse as a number for custom donation_project_id field
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        project = await DonationProject.findOne({ donation_project_id: numericId });
      }
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "Donation project not found" });
    }

    // Update the received count
    project.donation_items[itemType].received += parseInt(quantity);
    
    // Ensure received doesn't exceed required
    if (project.donation_items[itemType].received > project.donation_items[itemType].required) {
      project.donation_items[itemType].received = project.donation_items[itemType].required;
    }

    await project.save();

    res.json({
      success: true,
      message: `Thank you for donating ${quantity} ${itemType}!`,
      data: project
    });

  } catch (error) {
    console.error("Error updating donation received:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check if project title already exists
export const checkDonationProjectTitle = async (req, res) => {
  try {
    const { title } = req.body;

    const existingProject = await DonationProject.findOne({ title: title.trim() });

    if (existingProject) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Title check error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Upload images for donation projects
export const uploadDonationProjectImages = (req, res) => {
  try {
    const port = process.env.PORT || 5001;
    const mainImage = req.files["mainImage"]?.[0];

    console.log('Received files:', { 
      mainImage: mainImage?.filename
    });

    if (!mainImage) {
      return res.status(400).json({ success: false, message: "Main image is required." });
    }

    const imageUrl = `http://localhost:${port}/images/${mainImage.filename}`;

    console.log('Generated URL:', { imageUrl });

    return res.json({
      success: true,
      imageUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
};
