import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser  from "cookie-parser";
import paymentRoutes from "./src/routes/payment.js";
import executiveMemberRoutes from "./src/routes/executiveMembers.js";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5001;

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request Body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});
app.use(express.urlencoded({ extended: true })); // ✅ Added for form data


// Serve uploaded images (static route)
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API Routes - Grouped together
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/executive-members", executiveMemberRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api", eventRoutes);


// Root route
app.get("/", (req, res) => {
  res.send("LEO Club API is running ✅");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
