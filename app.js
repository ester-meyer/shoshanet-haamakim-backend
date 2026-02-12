require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');
const connectDB = require('./src/config/dbConn.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const productRoutes = require('./src/routes/productRoute.js');
const contactRoutes = require('./src/routes/contact.js');
const authRoutes = require('./src/routes/adminAuth.js');
const categoryRoutes = require('./src/routes/categoryRoute.js');

const PORT = process.env.PORT || 5001;
const app = express();
connectDB();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/product', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/categories', categoryRoutes);

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

mongoose.connection.once('open', () => {
  console.warn('Connected to MongoDB');
  app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});