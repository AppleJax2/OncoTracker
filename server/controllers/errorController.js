const AppError = require('../utils/appError');

// Helper functions for specific error types

// Handle Mongoose CastError (e.g., invalid ObjectId format)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle Mongoose Duplicate Fields Error (e.g., unique email violation)
const handleDuplicateFieldsDB = (err) => {
  // Different MongoDB driver versions might present the error differently
  // Extract the duplicate field value using regex, with fallbacks for different error formats
  let value;
  if (err.errmsg) {
    value = err.errmsg.match(/(?<=")(?:\\"|[^"\\])*(?=")/)?.[0];
  } else if (err.keyValue) {
    // Modern MongoDB driver puts duplicate key values in keyValue object
    value = Object.values(err.keyValue)[0];
  }
  
  // Fallback to a generic message if unable to extract the value
  value = value || 'duplicate value';
  
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle Mongoose Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle JWT Invalid Signature Error
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Handle JWT Expired Error
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Send detailed error response in development
const sendErrorDev = (err, res) => {
  console.error('ERROR 💥', err);
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send generic error response in production
const sendErrorProd = (err, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // B) Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// Global Error Handling Middleware
module.exports = (err, req, res, next) => {
  // Set default status code and status if not already defined
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, message: err.message }; // Avoid modifying original error object

    // Handle specific Mongoose/JWT errors for cleaner production messages
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
}; 