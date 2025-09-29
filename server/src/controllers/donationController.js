import mongoose from "mongoose";
import DonationProject from "../models/DonationProject.js";
import DonationItem from "../models/DonationItem.js";
import Donation from "../models/Donation.js";
import User from "../models/User.js";
import crypto from "crypto";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================== DONATION PAYMENT FUNCTIONALITY ========================

// Create a new donation record
export const createDonation = async (req, res) => {
  try {
    const {
      amount,
      donation_type, // 'project' or 'club_fund'
      donation_project_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      payment_method = 'online' // 'online' or 'bank_transfer'
    } = req.body;

    // Validation
    if (!amount || !donation_type || !first_name || !last_name || !email || !phone || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    if (!['project', 'club_fund'].includes(donation_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation type. Must be 'project' or 'club_fund'"
      });
    }

    if (donation_type === 'project' && !donation_project_id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required for project donations"
      });
    }

    // Validate project exists if it's a project donation
    if (donation_type === 'project') {
      const project = await DonationProject.findOne({ donation_project_id });
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Donation project not found"
        });
      }
    }

    // Generate unique donation ID
    const lastDonation = await Donation.findOne({}, {}, { sort: { donate_id: -1 } });
    const donate_id = lastDonation ? lastDonation.donate_id + 1 : 1;

    // Check if user is logged in
    let user_id = null;
    if (req.user && req.user._id) {
      user_id = req.user._id;
    }

    // Generate unique order ID for payment
    const order_id = `DON_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Create donation record
    const donation = new Donation({
      donate_id,
      amount: parseFloat(amount),
      donor: {
        user_id,
        first_name,
        last_name,
        email,
        phone,
        address,
        city
      },
      donation_project_id: donation_type === 'project' ? donation_project_id : null,
      donation_type,
      payment: {
        order_id,
        status: 'pending',
        payment_method
      }
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation record created successfully",
      data: {
        donation_id: donation._id,
        donate_id: donation.donate_id,
        order_id,
        amount: donation.amount,
        donation_type: donation.donation_type,
        project_id: donation.donation_project_id
      }
    });

  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
// Update your initiateDonationPayment function in donationController.js

export const initiateDonationPayment = async (req, res) => {
  try {
    const { donation_id } = req.body;

    if (!donation_id) {
      return res.status(400).json({
        success: false,
        message: "Donation ID is required"
      });
    }

    // Find donation record
    const donation = await Donation.findById(donation_id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    if (donation.payment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: "Payment has already been processed for this donation"
      });
    }

    const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET } = process.env;
    
    // Use FRONTEND_URL for user redirects, BASE_URL for webhook notifications
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';

    // Format amount to 2 decimal places
    const normalizedAmount = Number(donation.amount).toFixed(2);

    // Create PayHere payload
    const payherePayload = {
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: `${FRONTEND_URL}/donation-success?order_id=${donation.payment.order_id}`, // Changed to FRONTEND_URL
      cancel_url: `${FRONTEND_URL}/donation?cancelled=true`, // Changed to FRONTEND_URL
      notify_url: `${BASE_URL}/api/donation-projects/payment-notify`, // Keep BASE_URL for webhook
      order_id: donation.payment.order_id,
      items: donation.donation_type === 'project' 
        ? `Donation to Project #${donation.donation_project_id}` 
        : 'Donation to Club Fund',
      amount: normalizedAmount,
      currency: 'LKR',
      first_name: donation.donor.first_name,
      last_name: donation.donor.last_name,
      email: donation.donor.email,
      phone: donation.donor.phone,
      address: donation.donor.address,
      city: donation.donor.city,
      country: "Sri Lanka",
      delivery_address: donation.donor.address,
      delivery_city: donation.donor.city,
      delivery_country: "Sri Lanka",
      custom_1: donation.donation_type,
      custom_2: donation._id.toString()
    };

    // Generate MD5 signature
    const merchantSecretMd5 = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET || "")
      .digest("hex")
      .toUpperCase();

    const md5sig = crypto
      .createHash("md5")
      .update(
        payherePayload.merchant_id +
          payherePayload.order_id +
          payherePayload.amount +
          payherePayload.currency +
          merchantSecretMd5
      )
      .digest("hex")
      .toUpperCase();

    payherePayload.hash = md5sig;

    console.log(`Donation payment initialized: ${donation.payment.order_id}, Amount: ${normalizedAmount}`);
    console.log(`Frontend URL: ${FRONTEND_URL}, Backend URL: ${BASE_URL}`);

    res.json({
      success: true,
      payhere_payload: payherePayload
    });

  } catch (error) {
    console.error("Error initiating donation payment:", error);
    res.status(500).json({
      success: false,
      message: "Error initiating payment",
      error: error.message
    });
  }
};

// Handle PayHere notification for donations
export const handleDonationPaymentNotification = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      custom_1, // donation_type
      custom_2, // donation_id
      payment_id,
      payhere_reference
    } = req.body;

    console.log("Donation payment notification received:", { order_id, status_code, custom_1 });

    // Verify signature
    const { PAYHERE_MERCHANT_SECRET } = process.env;
    const merchantSecretMd5 = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET || "")
      .digest("hex")
      .toUpperCase();

    const localMd5 = crypto
      .createHash("md5")
      .update(
        String(merchant_id || "") +
          String(order_id || "") +
          String(payhere_amount || "") +
          String(payhere_currency || "") +
          String(status_code || "") +
          merchantSecretMd5
      )
      .digest("hex")
      .toUpperCase();

    if (localMd5 !== String(md5sig).toUpperCase()) {
      console.log(`❌ Invalid signature for donation order ${order_id}`);
      return res.sendStatus(200);
    }

    // Find donation by order_id
    const donation = await Donation.findOne({ 'payment.order_id': order_id });
    if (!donation) {
      console.error("Donation not found:", order_id);
      return res.sendStatus(200);
    }

    // Update donation based on payment status
    let paymentStatus = 'pending';
    let donationStatus = 'pending';

    if (Number(status_code) === 2) {
      // Payment successful
      paymentStatus = 'completed';
      donationStatus = 'verified';
      donation.payment.paid_at = new Date();
      console.log(`✅ Donation payment successful for order ${order_id}`);
    } else if (Number(status_code) === 0) {
      // Payment pending
      paymentStatus = 'pending';
      donationStatus = 'pending';
      console.log(`⏳ Donation payment pending for order ${order_id}`);
    } else {
      // Payment failed
      paymentStatus = 'failed';
      donationStatus = 'pending';
      console.log(`❌ Donation payment failed for order ${order_id}, status code: ${status_code}`);
    }

    // Update donation record
    donation.payment.status = paymentStatus;
    donation.payment.payment_id = payment_id;
    donation.payment.transaction_id = payhere_reference;
    donation.status = donationStatus;
    
    await donation.save();

    console.log(`Donation ${order_id} updated: Payment ${paymentStatus}, Status ${donationStatus}`);

    return res.sendStatus(200);
  } catch (error) {
    console.error("handleDonationPaymentNotification error:", error);
    return res.sendStatus(200);
  }
};

// Upload receipt for bank transfer donations
export const uploadDonationReceipt = async (req, res) => {
  try {
    const { donation_id } = req.body;
    
    if (!donation_id) {
      return res.status(400).json({
        success: false,
        message: "Donation ID is required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Receipt file is required"
      });
    }

    console.log('Receipt upload - Donation ID:', donation_id);
    console.log('Receipt file details:', {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    });

    // Find donation
    const donation = await Donation.findById(donation_id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    // Update donation with receipt information
    donation.receipt = {
      file_path: req.file.path,
      file_name: req.file.filename,
      original_name: req.file.originalname,
      uploaded_at: new Date()
    };
    donation.payment.status = 'receipt_uploaded';
    donation.status = 'pending'; // Pending admin verification

    await donation.save();

    console.log('Receipt uploaded successfully for donation:', donation_id);

    res.json({
      success: true,
      message: "Receipt uploaded successfully",
      data: {
        donation_id: donation._id,
        receipt_filename: req.file.filename,
        status: donation.status
      }
    });

  } catch (error) {
    console.error("Error uploading donation receipt:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading receipt",
      error: error.message
    });
  }
};

// Get all donations (admin)
export const getAllDonations = async (req, res) => {
  try {
    const { page = 1, limit = 100, status, donation_type } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (donation_type) filter.donation_type = donation_type;

    const donations = await Donation.find(filter)
      .populate('donor.user_id', 'firstName lastName leo_Id')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(filter);

    // Transform the data to match frontend expectations
    const transformedDonations = donations.map(donation => ({
      _id: donation._id,
      donor_name: donation.donor.first_name && donation.donor.last_name 
        ? `${donation.donor.first_name} ${donation.donor.last_name}` 
        : donation.donor.user_id 
          ? `${donation.donor.user_id.firstName} ${donation.donor.user_id.lastName}` 
          : 'Anonymous',
      donor_email: donation.donor.email || (donation.donor.user_id ? donation.donor.user_id.email : ''),
      donor_phone: donation.donor.phone,
      donor_address: donation.donor.address,
      donor_city: donation.donor.city,
      amount: donation.amount,
      donation_type: donation.donation_type,
      project_id: donation.donation_project_id,
      payment_method: donation.payment?.payment_method || 'online',
      payment: donation.payment,
      receipt: donation.receipt?.file_path || donation.receipt,
      status: donation.status,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt
    }));

    res.json(transformedDonations);

  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching donations",
      error: error.message
    });
  }
};

// Get donations by user
export const getUserDonations = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const donations = await Donation.find({
      $or: [
        { 'donor.user_id': userId },
        { 'donor.email': req.user.email }
      ]
    }).sort({ created_at: -1 });

    res.json({
      success: true,
      data: donations
    });

  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user donations",
      error: error.message
    });
  }
};

// Verify donation (admin)
export const verifyDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    // Update status to verified
    donation.status = 'verified';
    donation.verified_at = new Date();
    await donation.save();

    res.json({
      success: true,
      message: "Donation verified successfully",
      data: donation
    });

  } catch (error) {
    console.error("Error verifying donation:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying donation",
      error: error.message
    });
  }
};

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

// ======================== DONATION ITEMS FUNCTIONALITY ========================

// Add new donation item
export const addDonationItem = async (req, res) => {
  try {
    const { 
      project_id, 
      donor_info, 
      donated_items, 
      estimated_value, 
      collection_details, 
      user_id, 
      notes 
    } = req.body;

    // Validate required fields
    if (!project_id || !donor_info || !donated_items) {
      return res.status(400).json({ 
        success: false, 
        message: "Project ID, donor info, and donated items are required" 
      });
    }

    // Check if project exists
    const project = await DonationProject.findById(project_id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Donation project not found" 
      });
    }

    // Create new donation item
    const donationItem = new DonationItem({
      project_id,
      donor_info,
      donated_items,
      estimated_value: estimated_value || 0,
      collection_details,
      user_id: user_id || null,
      notes
    });

    await donationItem.save();

    // Update the project's received quantities
    if (donated_items.books > 0) {
      project.donation_items.books.received += donated_items.books;
    }
    if (donated_items.pens > 0) {
      project.donation_items.pens.received += donated_items.pens;
    }
    if (donated_items.clothes > 0) {
      project.donation_items.clothes.received += donated_items.clothes;
    }

    // Ensure received doesn't exceed required
    Object.keys(project.donation_items).forEach(key => {
      if (project.donation_items[key].received > project.donation_items[key].required) {
        project.donation_items[key].received = project.donation_items[key].required;
      }
    });

    await project.save();

    console.log("New donation item created:", donationItem.donation_id);
    
    res.status(201).json({
      success: true,
      message: "Thank you for your donation! Your items have been recorded successfully.",
      data: {
        donation: donationItem,
        updated_project: project
      }
    });

  } catch (error) {
    console.error("Error adding donation item:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all donation items
export const getAllDonationItems = async (req, res) => {
  try {
    const { project_id, status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (project_id) query.project_id = project_id;
    if (status) query.status = status;

    const donations = await DonationItem.find(query)
      .populate('project_id', 'title description location city')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await DonationItem.countDocuments(query);

    res.json({
      success: true,
      data: donations,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error("Error fetching donation items:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get donation items by project
export const getDonationItemsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    
    // First, find the project using either MongoDB _id or custom donation_project_id
    let project = null;
    
    if (mongoose.Types.ObjectId.isValid(projectId) && projectId.length === 24) {
      // It's a MongoDB ObjectId
      project = await DonationProject.findById(projectId);
    } else {
      // Try to parse as a number for custom donation_project_id field
      const numericId = parseInt(projectId);
      if (!isNaN(numericId)) {
        project = await DonationProject.findOne({ donation_project_id: numericId });
      }
    }
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    
    // Now query donation items using the MongoDB _id
    const donations = await DonationItem.find({ project_id: project._id })
      .populate('project_id', 'title description location city donation_project_id')
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donations,
      total: donations.length,
      project: {
        id: project.donation_project_id,
        title: project.title,
        description: project.description,
        location: project.location,
        city: project.city,
        donation_items: project.donation_items
      }
    });

  } catch (error) {
    console.error("Error fetching donation items by project:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update donation item status
export const updateDonationItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'confirmed', 'received', 'distributed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'pending', 'confirmed', 'received', or 'distributed'"
      });
    }

    const donation = await DonationItem.findById(id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation item not found"
      });
    }

    donation.status = status;
    if (notes) donation.notes = notes;
    
    await donation.save();

    res.json({
      success: true,
      message: "Donation status updated successfully",
      data: donation
    });

  } catch (error) {
    console.error("Error updating donation item status:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete donation item
export const deleteDonationItem = async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await DonationItem.findById(id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation item not found"
      });
    }

    // If deleting, we might want to reduce the project's received quantities
    // This is optional - you can remove this if you don't want to reverse the counts
    const project = await DonationProject.findById(donation.project_id);
    if (project) {
      if (donation.donated_items.books > 0) {
        project.donation_items.books.received = Math.max(0, 
          project.donation_items.books.received - donation.donated_items.books
        );
      }
      if (donation.donated_items.pens > 0) {
        project.donation_items.pens.received = Math.max(0, 
          project.donation_items.pens.received - donation.donated_items.pens
        );
      }
      if (donation.donated_items.clothes > 0) {
        project.donation_items.clothes.received = Math.max(0, 
          project.donation_items.clothes.received - donation.donated_items.clothes
        );
      }
      await project.save();
    }

    await DonationItem.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Donation item deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting donation item:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
