const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to protect routes, ensuring only authenticated users can access them.
 * It extracts the JWT from the Authorization header, verifies it, and attaches the
 * decoded user payload (userId, roles, isVerified) to the request object.
 * If the token is missing or invalid, it sends an appropriate error response.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
async function protect(req, res, next) {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = verifyToken(token);

      // Attach user information to the request object
      // This information comes from the JWT payload
      req.user = {
        id: decoded.userId,
        roles: decoded.roles,
        isVerified: decoded.isVerified,
      };

      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      // Handle different JWT verification errors
      if (error.message === 'Token has expired') {
        return res.status(401).json({ message: 'Authorization token has expired.' });
      }
      if (error.message === 'Invalid token') {
        return res.status(401).json({ message: 'Invalid authorization token.' });
      }
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token.' });
  }
}

/**
 * Middleware to authorize users based on their roles.
 * This middleware should be used after the `protect` middleware, as it relies on `req.user.roles`.
 * @param {Array<string>} allowedRoles - An array of roles that are permitted to access the route (e.g., ['admin', 'manager']).
 * @returns {function} An Express middleware function.
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    // Check if req.user exists (i.e., protect middleware ran successfully)
    if (!req.user || !req.user.roles) {
      console.warn('Authorization middleware used before protect middleware or req.user is missing.');
      return res.status(500).json({ message: 'Internal server error: User roles not found.' });
    }

    // Check if the user has any of the allowed roles
    const hasPermission = req.user.roles.some(role => allowedRoles.includes(role));

    if (hasPermission) {
      next(); // User has the necessary role, proceed
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
    }
  };
}

module.exports = {
  protect,
  authorizeRoles,
};