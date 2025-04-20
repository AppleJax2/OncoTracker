const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Route Imports
const authRouter = require('./routes/authRoutes');
const petRouter = require('./routes/petRoutes');
const linkRequestRouter = require('./routes/linkRequestRoutes');

const app = express();
const port = process.env.PORT || 5000;

// --- Database Connection ---
const DB = process.env.MONGODB_URI;
if (!DB) {
  console.error('FATAL ERROR: MONGODB_URI environment variable is not set.');
  process.exit(1); // Exit if DB connection string is missing
}

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // Not needed in Mongoose 6+
  // useFindAndModify: false // Not needed in Mongoose 6+
}).then(() => console.log('MongoDB connection successful!'))
  .catch(err => {
      console.error('MongoDB connection error:', err);
      // We might catch this in unhandledRejection, but logging here is good too.
      // process.exit(1); // Optionally exit immediately on initial connection failure
  });

// Basic middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

console.log('Setting up API routes...');

app.use('/api/auth', authRouter);
app.use('/api/pets', petRouter);
app.use('/api/link-requests', linkRequestRouter);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly - Test Route' });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'OncoTracker API is running',
    version: '2.0.0',
    endpoints: ['/api/auth', '/api/test']
  });
});

if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static assets for production...');
  const clientDistPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));
  
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
       return next();
    }
    console.log('Serving SPA index.html for path:', req.originalUrl);
    const indexPath = path.join(clientDistPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('ERROR 💥 Serving index.html:', err);
            if (err.code === 'ENOENT') {
                 next(new AppError('Client application not found', 404));
            } else {
                 next(err);
            }
        }
    });
  });
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Store the server instance for graceful shutdown
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(`${err.name}: ${err.message}`);
  // Close server gracefully before exiting
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
    process.exit(0); // Use 0 for graceful shutdown signal
  });
});

module.exports = app; 