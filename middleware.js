// Require necessary packages
const express = require('express');
const jwt = require('jsonwebtoken');

// Create middleware function
function authMiddleware(req, res, next) {
  // Get token from request headers
  const token = req.headers.authorization.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle invalid token
      res.status(401).json({ message: 'Invalid token' });
    } else {
      // Add decoded token to request object
      req.user = decoded;

      // Move on to next middleware or route handler
      next();
    }
  });
}

// Export middleware function
module.exports = authMiddleware;
