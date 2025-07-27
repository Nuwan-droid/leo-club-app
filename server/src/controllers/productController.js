import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Add new product
export const addProduct = async (req, res) => {
  try {
    console.log('Received product data:', JSON.stringify(req.body, null, 2));

    // Validate required fields
    if (!req.body.name || !req.body.price || !req.body.description) {
      return res.status(400).json({ success: false, message: "Name, price, and description are required." });
    }

    const productData = {
      name: req.body.name,
      price: req.body.price,
      originalPrice: req.body.originalPrice || null,
      description: req.body.description,
      mainImage: req.body.mainImage || '',
      additionalImages: req.body.additionalImages || [],
      sizes: req.body.sizes || [],
      colors: req.body.colors || [],
      material: req.body.material || [],
      badge: req.body.badge || null,
    };

    // Generate product_id if not provided
    if (!productData.product_id) {
      const lastProduct = await Product.findOne().sort({ product_id: -1 }).exec();
      productData.product_id = lastProduct && lastProduct.product_id ? lastProduct.product_id + 1 : 1;
      console.log('Manually generated product_id:', productData.product_id);
    }

    const product = new Product(productData);

    console.log('Product before save:', JSON.stringify(product, null, 2));
    await product.save();
    console.log('Product saved with ID:', product.product_id);
    if (!product.product_id) {
      console.error('Product saved without product_id!');
      return res.status(500).json({ success: false, message: "Product saved but product_id was not generated." });
    }
    res.json({ success: true, name: req.body.name, product_id: product.product_id });
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "Duplicate product ID detected." });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    let product = null;

    if (mongoose.Types.ObjectId.isValid(productId) && productId.length === 24) {
      product = await Product.findById(productId);
    } else {
      const numericId = parseInt(productId);
      if (!isNaN(numericId)) {
        product = await Product.findOne({ product_id: numericId });
      }
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product by ID
export const removeProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    let result = null;
    if (mongoose.Types.ObjectId.isValid(productId) && productId.length === 24) {
      result = await Product.findByIdAndDelete(productId);
    } else {
      const numericId = parseInt(productId);
      if (!isNaN(numericId)) {
        result = await Product.findOneAndDelete({ product_id: numericId });
      } else {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
      }
    }
    if (result) {
      res.json({ success: true, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id, name, price, originalPrice, description, badge, sizes, colors, material } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    const updateData = { name, price, originalPrice, description, badge, sizes, colors, material };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === '') delete updateData[key];
    });
    let result = null;
    if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
      result = await Product.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        result = await Product.findOneAndUpdate({ product_id: numericId }, updateData, { new: true });
      } else {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
      }
    }
    if (result) {
      res.json({ success: true, message: "Product updated successfully", product: result });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Image upload handler
export const uploadImages = (req, res) => {
  const port = process.env.PORT || 5001;
  const mainImageUrl = req.files['mainImage']
    ? `http://localhost:${port}/images/${req.files['mainImage'][0].filename}`
    : null;
  const additionalImagesUrls = req.files['additionalImages']
    ? req.files['additionalImages'].map(file => `http://localhost:${port}/images/${file.filename}`)
    : [];

  if (!mainImageUrl) {
    return res.status(400).json({ success: false, message: "Main image is required." });
  }

  res.json({
    success: true,
    main_image_url: mainImageUrl,
    additional_image_urls: additionalImagesUrls,
  });
};