const User = require('../models/User');
const authService = require('../services/authService');

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { name, email, phone, password, confirmPassword } = req.body;

      // Validation checks
      if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match'
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long'
        });
      }

      // Validate phone format
      const phoneRegex = /^(\+2547\d{8}|07\d{8})$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        return res.status(400).json({
          success: false,
          message: 'Phone number must be in format: 0712345678 or +254712345678'
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { phone }]
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email or phone already exists'
        });
      }

      // Create new user
      const user = new User({
        name,
        email,
        phone,
        password
      });

      await user.save();

      // Generate token
      const token = authService.generateToken(user);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: error.message
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user by email
      const user = await User.findOne({ email, isActive: true });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = authService.generateToken(user);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          token,
          redirectTo: user.role === 'admin' || user.role === 'super_admin' 
            ? '/admin/dashboard' 
            : '/user/dashboard'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Error logging in',
        error: error.message
      });
    }
  },

  // Google OAuth callback
  googleCallback: async (req, res) => {
    try {
      const token = authService.generateToken(req.user);
      
      res.json({
        success: true,
        message: 'Google authentication successful',
        data: {
          user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role,
            avatar: req.user.avatar
          },
          token,
          redirectTo: req.user.role === 'admin' || req.user.role === 'super_admin' 
            ? '/admin/dashboard' 
            : '/user/dashboard'
        }
      });
    } catch (error) {
      console.error('Google OAuth error:', error);
      res.status(500).json({
        success: false,
        message: 'Google authentication failed',
        error: error.message
      });
    }
  },

  // Get current user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message
      });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const userId = req.user.id;

      // Check if email or phone is already taken by another user
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: userId } },
          { $or: [{ email }, { phone }] }
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email or phone already taken'
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, phone },
        { new: true, runValidators: true }
      ).select('-password');

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: updatedUser }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating profile',
        error: error.message
      });
    }
  },

  // Delete user account
  deleteAccount: async (req, res) => {
    try {
      const userId = req.user.id;
      await User.findByIdAndUpdate(userId, { isActive: false });

      res.json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting account',
        error: error.message
      });
    }
  },

  // Logout
  logout: (req, res) => {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  }
};

module.exports = authController;