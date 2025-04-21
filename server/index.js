const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const mongoose = require('mongoose');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Route Imports
const authRouter = require('./routes/authRoutes');
const petRouter = require('./routes/petRoutes');
const linkRequestRouter = require('./routes/linkRequestRoutes');
const userRouter = require('./routes/userRoutes');

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
  origin: function(origin, callback) {
    // Define allowed origins
    const allowedOrigins = [
      'https://oncotracker.netlify.app', // Netlify production
      'http://localhost:5173',           // Local development
    ];
    
    // Add dynamic origins based on environment variables if provided
    if (process.env.CLIENT_URL) {
      allowedOrigins.push(process.env.CLIENT_URL);
    }
    
    // For requests without origin (like mobile apps, curl, etc)
    if (!origin) {
      // Log only once per server start
      if (!global.originlessRequestLogged) {
        console.log('Request without origin accepted');
        global.originlessRequestLogged = true;
      }
      return callback(null, true);
    }
    
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      // Only log new origins to reduce spam
      if (!global.loggedOrigins) {
        global.loggedOrigins = new Set();
      }
      
      if (!global.loggedOrigins.has(origin)) {
        console.log(`CORS: Allowing origin: ${origin}`);
        global.loggedOrigins.add(origin);
      }
      
      return callback(null, true);
    } else {
      console.warn(`CORS: Rejected request from disallowed origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

console.log('Setting up API routes...');

app.use('/api/auth', authRouter);
app.use('/api/pets', petRouter);
app.use('/api/link-requests', linkRequestRouter);
app.use('/api/users', userRouter);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly - Test Route' });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'OncoTracker API is running',
    version: '2.0.0',
    endpoints: ['/api/auth', '/api/users', '/api/pets', '/api/link-requests', '/api/test']
  });
});

if (process.env.NODE_ENV === 'production') {
  // Only attempt to serve SPA if explicitly configured to do so
  // This allows for split deployment where frontend is on Netlify and backend on Render
  if (process.env.SERVE_SPA === 'true') {
    console.log('Setting up static assets for production SPA...');
    
    // Use environment variable or fallback to relative path
    const clientDistPath = process.env.CLIENT_DIST_PATH || path.join(__dirname, '../client/dist');
    
    // Log the path for debugging purposes
    console.log('Client dist path:', clientDistPath);
    
    // Check if directory exists
    if (!fs.existsSync(clientDistPath)) {
      console.warn(`WARNING: Client dist directory not found at ${clientDistPath}`);
      console.warn('If you are using a split deployment (frontend on Netlify, backend on Render),');
      console.warn('you should set SERVE_SPA=false or simply not set it.');
    } else {
      app.use(express.static(clientDistPath));
      
      app.get('*', (req, res, next) => {
        if (req.originalUrl.startsWith('/api/')) {
           return next();
        }
        console.log('Serving SPA index.html for path:', req.originalUrl);
        const indexPath = path.join(clientDistPath, 'index.html');
        
        // Check if file exists first
        if (!fs.existsSync(indexPath)) {
          console.error(`ERROR: index.html not found at ${indexPath}`);
          return next(new AppError('Client application not found', 404));
        }
        
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
  } else {
    console.log('Running in API-only mode - not serving static assets');
    console.log('For frontend requests, make sure CORS is configured correctly');
    
    // Add a route to handle SPA requests that mistakenly come to the API server
    app.get('*', (req, res, next) => {
      // Skip API routes
      if (req.originalUrl.startsWith('/api/')) {
        return next();
      }
      
      // Return a more helpful error for frontend routes
      return next(
        new AppError(
          'This server is configured to only handle API requests. ' +
          'Frontend requests should go to the static hosting service (e.g., Netlify).',
          404
        )
      );
    });
  }
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