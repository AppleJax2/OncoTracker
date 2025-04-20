const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate token
const auth = async (req, res, next) => {
  try {
    // Get token from cookie or header
    let token = null;
    
    // First check cookie (preferred method)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } 
    // Fallback to header for backward compatibility
    else if (req.header('x-auth-token')) {
      token = req.header('x-auth-token');
    }
    // Also check Authorization header for Bearer token
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token using process.env.JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'oncotracker_secure_jwt_secret_2025'); // Added default fallback matching index.js
    
    // Add user from payload
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied: Admin rights required' });
  }
};

// Middleware to verify study access token
const studyAccess = async (req, res, next) => {
  try {
    const { accessToken } = req.params;
    
    if (!accessToken) {
      return res.status(401).json({ msg: 'Access token required' });
    }
    
    // Token validation logic will be handled in the route controller
    // This middleware just ensures the token is present
    
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { auth, admin, studyAccess }; 