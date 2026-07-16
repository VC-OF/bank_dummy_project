const jwt = require('jsonwebtoken');

// It's recommended to load environment variables at the application entry point (e.g., app.js or server.js)
// using 'dotenv' package, so they are globally available.
// For development, provide a fallback secret. In production, ensure process.env.JWT_SECRET is set.
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_please_change_this_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Default to 1 hour

/**
 * Generates a JSON Web Token (JWT) for a given payload.
 * The token will be signed with the configured secret and expire after a set duration.
 * @param {object} payload - The data to include in the token (e.g., { userId: '...', roles: ['user'] }).
 * @returns {string} The generated JWT.
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JSON Web Token (JWT) and returns its decoded payload if valid.
 * Throws an error if the token is invalid, expired, or malformed.
 * @param {string} token - The JWT string to verify.
 * @returns {object} The decoded token payload.
 * @throws {Error} If the token is invalid, expired, or malformed.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Specific error handling for JWT errors to provide clearer messages
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    // Re-throw any other unexpected errors
    throw error;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};