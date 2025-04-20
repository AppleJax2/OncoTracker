// Standard Node.js Error class extension for operational errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // Determine status based on statusCode (fail for 4xx, error for 5xx)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Mark as an operational error (trusted, predictable)
    this.isOperational = true;

    // Capture stack trace, excluding constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError; 