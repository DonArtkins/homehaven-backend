const jwt = require('jsonwebtoken');

const authService = {
  // Generate JWT token
  generateToken: (user) => {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );
  },

  // Verify token (alternative method)
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  // Check if user has required role
  requireRole: (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }
    };
  }
};

module.exports = authService;