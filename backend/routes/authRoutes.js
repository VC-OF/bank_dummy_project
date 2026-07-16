const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup - Register a new user
router.post('/signup', authController.signup);

// POST /api/auth/login - Log in an existing user
router.post('/login', authController.login);

module.exports = router;