import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import paymentRoutes from "./src/routes/paymentRoutes.js";
import executiveMemberRoutes from "./src/routes/executiveMembers.js";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";  
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // if you want to restrict: cors({ origin: "http://localhost:5173", credentials: true })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// (Optional) request logger without leaking passwords
app.use((req, res, next) => {
  const safeBody = { ...req.body };
  if (safeBody.password) safeBody.password = "***";
  if (safeBody.confirmPassword) safeBody.confirmPassword = "***";
  console.log(`[${req.method}] ${req.url}`, safeBody);
  next();
});
app.use(express.urlencoded({ extended: true })); // 

// Serve uploaded images (static route)
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API Routes - Grouped together
app.use("/api/auth", authRoutes);                 // ✅ matches frontend /api/auth/signup
app.use("/api/products", productRoutes);
app.use("/api/executive-members", executiveMemberRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", eventRoutes);
app.use("/api/projects", projectRoutes);  
app.use("/api/comments", commentRoutes);  

// Root route
app.get("/", (req, res) => {
  res.send("LEO Club API is running ✅");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
