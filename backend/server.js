const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Ensure mongoose is imported for use in connectDB
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Call only once via utility function

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow only React frontend
app.use(express.json()); // Parse JSON requests

// API Routes
app.use('/api/users', require('./routes/userRoutes')); // User-related routes
app.use('/api/threads', require('./routes/threadRoutes')); // Thread-related routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Graceful shutdown on uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1)); // Shut down server before exiting
});
