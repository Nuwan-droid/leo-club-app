import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('LEO Club API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


