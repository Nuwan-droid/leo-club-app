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
import userRoutes from "./src/routes/userRoutes.js";
import awardRoutes from "./src/routes/awardRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import orderRoutes from './src/routes/orderRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js'; 
import newsletterRoutes from "./src/routes/newsletterRoutes.js";
import { handleMulterError } from "./src/config/upload.js";
import adminRequestRoutes from "./src/routes/admin_requestRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "upload/images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use("/receipts", express.static(path.join(__dirname, "upload/receipts"))); 

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/executive-members", executiveMemberRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.use("/api/awards", awardRoutes);
app.use("/api/donation-projects", donationRoutes); 
app.use("/api/user",userRoutes);
app.use("/api/admin-requests",adminRequestRoutes);

app.use("/api/newsletters", newsletterRoutes);
app.use(handleMulterError);

app.get("/", (req, res) => {
  res.json({ message: "LEO Club API is running ✅" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot`);
});
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});


export const callOrderWebhook = async (webhookData) => {
  try {
    console.log("Calling order webhook with data:", webhookData);
    
    const response = await fetch(`${process.env.BASE_URL}/api/orders/webhook/payhere`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookData)
    });

    if (response.ok) {
      console.log("Order webhook called successfully");
    } else {
      console.error("Order webhook failed:", response.status);
    }
  } catch (error) {
    console.error("Error calling order webhook:", error);
  }
};