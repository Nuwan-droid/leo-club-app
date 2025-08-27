import mongoose from "mongoose";
import Project from "../models/Project.js";
import Comment from "../models/Comment.js";

// Get all projects with comment counts
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});

    // Get comment counts for each project
    const projectsWithComments = await Promise.all(
      projects.map(async (project) => {
        const commentCount = await Comment.countDocuments({ projectId: project.id });
        return {
          ...project.toObject(),
          commentCount,
        };
      })
    );

    console.log("All Projects fetched with comment counts");
    res.send(projectsWithComments);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new project
export const addProject = async (req, res) => {
  try {
    // Find projects that have a valid numeric id field
    const projects = await Project.find({ id: { $type: "number" } })
      .sort({ id: -1 })
      .limit(1);

    let nextId = 1; // Default starting ID

    if (projects.length > 0 && projects[0].id && !isNaN(projects[0].id)) {
      nextId = projects[0].id + 1;
    }

    console.log("Generated next ID:", nextId);

    const project = new Project({
      id: nextId,
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      year: req.body.year,
      image: req.body.image,
      sliderImages: req.body.sliderImages || [],
    });

    await project.save();
    console.log("Saved project with ID:", nextId);
    res.json({ success: true, title: req.body.title, id: nextId });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id, title, subtitle, description, date, location } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    // Extract year from date if date is provided
    let year;
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate)) {
        year = parsedDate.getFullYear();
      }
    }

    const updateData = {
      title,
      subtitle,
      description,
      date,
      location,
      ...(year && { year }),
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
      console.log("Updating by MongoDB _id:", id);
      result = await Project.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      // Try to parse as a number for custom id field
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        console.log("Updating by custom id:", numericId);
        result = await Project.findOneAndUpdate({ id: numericId }, updateData, {
          new: true,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid project ID format" });
      }
    }

    if (result) {
      console.log("Successfully updated project:", id);
      res.json({
        success: true,
        message: "Project updated successfully",
        project: result,
      });
    } else {
      console.log("Project not found with ID:", id);
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove project
export const removeProject = async (req, res) => {
  try {
    const projectId = req.body.id;

    if (!projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    let result = null;
    let numericProjectId = null;

    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(projectId) && projectId.length === 24) {
      console.log("Deleting by MongoDB _id:", projectId);
      // First get the project to find its custom id for comment deletion
      const project = await Project.findById(projectId);
      if (project) {
        numericProjectId = project.id;
      }
      result = await Project.findByIdAndDelete(projectId);
    } else {
      // Try to parse as a number for custom id field
      const numericId = parseInt(projectId);
      if (!isNaN(numericId)) {
        console.log("Deleting by custom id:", numericId);
        numericProjectId = numericId;
        result = await Project.findOneAndDelete({ id: numericId });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid project ID format" });
      }
    }

    if (result) {
      // Also delete all comments associated with this project
      if (numericProjectId) {
        await Comment.deleteMany({ projectId: numericProjectId });
        console.log("Deleted comments for project:", numericProjectId);
      }
      console.log("Successfully removed project:", projectId);
      res.json({
        success: true,
        message: "Project and associated comments deleted successfully",
      });
    } else {
      console.log("Project not found with ID:", projectId);
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    console.error("Error removing project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload images
// Fixed uploadImages function in projectController.js
export const uploadImages = (req, res) => {
  try {
    const port = process.env.PORT || 5001; // Add fallback port

    const mainImage = req.files["mainImage"]?.[0];
    const sliderFiles = req.files["sliderImages"] || [];

    console.log('Received files:', { 
      mainImage: mainImage?.filename, 
      sliderCount: sliderFiles.length 
    });

    if (!mainImage) {
      return res
        .status(400)
        .json({ success: false, message: "Main image is required." });
    }

    const imageUrl = `http://localhost:${port}/images/${mainImage.filename}`;
    const slider_image_urls = sliderFiles.map(
      (file) => `http://localhost:${port}/images/${file.filename}`
    );

    console.log('Generated URLs:', { imageUrl, slider_image_urls });

    return res.json({
      success: true,
      imageUrl,
      slider_image_urls,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
};