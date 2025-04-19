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
// Define allowed origins
const allowedOrigins = [
  'https://oncotracker.netlify.app', // Your primary Netlify domain
  'http://localhost:5173'        // For local development (if you use port 5173)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // If you need to handle cookies or authorization headers
}));
// app.use(cors()); // Remove or comment out the original generic cors middleware
app.use(express.json());

// MongoDB Connection URI - use environment variables only
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set. Database connections will fail.');
}

if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set. Authentication will fail.');
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  // Add robust connection options
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
console.log('Setting up API routes...');
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/submissions', submissionRoutes);

// Handle production - REMOVED STATIC FILE SERVING
// The frontend is served by Netlify, the backend only serves the API
// if (process.env.NODE_ENV === 'production') {
//   console.log('Setting up static assets for production...');
//   // Static folder
//   app.use(express.static(path.join(__dirname, '../client/dist')));

//   // Handle SPA
//   app.get('/:path(*)', (req, res) => {
//     console.log('Serving SPA for path:', req.path);
//     res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
//   });
// }

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 