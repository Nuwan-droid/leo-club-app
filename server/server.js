import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './src/config/database.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Root route for test
app.get('/', (req, res) => {
  res.send('✅ LEO Club API is running');
});

// Catch-all 404 for debugging
app.use((req, res) => {
  res.status(404).send(`❌ Cannot find ${req.originalUrl} on this server`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
