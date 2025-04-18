const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - attempt to connect but continue if it fails
if (process.env.MONGODB_URI) {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI, { 
    serverSelectionTimeoutMS: 5000 // 5 second timeout
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Could not connect to MongoDB, continuing without database:', err.message);
    });
}

// API Routes
console.log('Setting up API routes...');

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly' });
});

// Root API info route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'OncoTracker API is running',
    version: '1.0.0', 
    endpoints: ['/api/test']
  });
});

// Handle static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static assets for production...');
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Simple SPA handler - NO REGEX!
  // This must be AFTER all API routes and BEFORE the 404 handler
  app.use((req, res, next) => {
    // Skip API requests
    if (req.url.startsWith('/api')) {
      return next();
    }
    
    console.log('Serving SPA for path:', req.path);
    // For all other requests, serve the index.html file
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the app for potential use in other files
module.exports = app; 