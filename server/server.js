import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import executiveMemberRoutes from "./src/routes/executiveMembers.js";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Fix __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/executive-members", executiveMemberRoutes);

// Serve uploaded images (static route)
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("LEO Club API is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
