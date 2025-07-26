// src/routes/productRoutes.js
import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProduct,
  uploadImages
} from '../controllers/productController.js';
import { multiUpload } from '../middleware/upload.js';

const router = express.Router();

// Image upload endpoint (separate from product creation)
router.post('/upload', multiUpload, uploadImages);



// Product CRUD endpoints
router.post('/addproduct', addProduct); // Remove multiUpload from here since images are uploaded separately
router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/removeproduct', removeProduct);
router.post('/updateproduct', updateProduct);

export default router;