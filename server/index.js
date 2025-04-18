const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const studyRoutes = require('./routes/studies');
const submissionRoutes = require('./routes/submissions');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jacksonlnull:Y1reji6kqUVmFP5Y@cluster0.tse5h4s.mongodb.net/OncoTracker?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = process.env.JWT_SECRET || 'oncotracker_secure_jwt_secret_2025';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
console.log('Setting up API routes...');
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/submissions', submissionRoutes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static assets for production...');
  // Static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle SPA - POTENTIAL ISSUE: Change wildcard route to be even more explicit
  // Instead of '/*', use a named parameter with a wildcard matching pattern
  app.get('/:path(*)', (req, res) => {
    console.log('Serving SPA for path:', req.path);
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 