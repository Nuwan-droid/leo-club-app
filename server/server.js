const express = require('express');
require('dotenv').config(); 
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);

});
