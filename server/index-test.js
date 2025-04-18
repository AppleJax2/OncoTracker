const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import our test server app
const app = require('./test-server');

// MongoDB Connection URI with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jacksonlnull:Y1reji6kqUVmFP5Y@cluster0.tse5h4s.mongodb.net/OncoTracker?retryWrites=true&w=majority&appName=Cluster0';

// Try to connect to MongoDB, but continue even if it fails
console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URI, { 
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB. The server will continue without database functionality:', err.message);
  });

// Start server even if MongoDB connection fails
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 