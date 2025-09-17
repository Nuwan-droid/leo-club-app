import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Import routes
import paymentRoutes from "./src/routes/paymentRoutes.js";
import executiveMemberRoutes from "./src/routes/executiveMembers.js";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import awardRoutes from "./src/routes/awardRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

// ✅ Import new file routes (PDF upload/download)
import fileRoutes from "./src/routes/fileRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/executive-members", executiveMemberRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/donation-projects", donationRoutes);
app.use("/api/user", userRoutes);

// ✅ File upload/download routes
app.use("/api/files", fileRoutes);

// Static folder for images & PDFs
app.use("/upload", express.static(path.join(path.resolve(), "upload")));
app.use("/images", express.static(path.join(__dirname, "upload/images")));
app.use("/pdfs", express.static(path.join(__dirname, "upload/pdfs"))); 


// Default route
app.get("/", (req, res) => {
  res.json({ message: "LEO Club API is running ✅" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📂 File Upload API: http://localhost:${PORT}/api/files`);
});
