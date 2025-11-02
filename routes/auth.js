const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const passport = require('passport');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  authController.googleCallback
);

// Protected routes
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);
router.delete('/account', auth, authController.deleteAccount);
router.post('/logout', auth, authController.logout);

module.exports = router;