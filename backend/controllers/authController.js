const authService = require('../services/authService');

/**
 * Handles user registration (signup).
 * Expects username, email, and password in the request body.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
async function signup(req, res, next) {
  const { username, email, password } = req.body;

  // Basic input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const { user, token } = await authService.registerUser(username, email, password);
    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
      user,
      token,
    });
  } catch (error) {
    if (error.message.includes('Username is already taken.') || error.message.includes('Email is already registered.')) {
      return res.status(409).json({ message: error.message }); // Conflict
    }
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
}

/**
 * Handles user login.
 * Expects identifier (username or email) and password in the request body.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
async function login(req, res, next) {
  const { identifier, password } = req.body; // 'identifier' can be username or email

  // Basic input validation
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identifier (username or email) and password are required.' });
  }

  try {
    const { user, token } = await authService.loginUser(identifier, password);
    res.status(200).json({
      message: 'Logged in successfully.',
      user,
      token,
    });
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message }); // Unauthorized
    }
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
}

module.exports = {
  signup,
  login,
};