const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/User'); // User model
const { generateToken } = require('../utils/jwt'); // JWT utility

// Salt rounds for bcrypt hashing. Higher value means more secure but slower.
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

/**
 * Registers a new user.
 * Hashes the password, checks for existing users, and saves the new user to the database.
 * @param {string} username - The user's chosen username.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain-text password.
 * @returns {Promise<object>} An object containing the new user's public data and a JWT token.
 * @throws {Error} If a user with the given username or email already exists, or other registration errors.
 */
async function registerUser(username, email, password) {
  // Check if a user with the given username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Username is already taken.');
    }
    if (existingUser.email === email) {
      throw new Error('Email is already registered.');
    }
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    passwordHash,
    roles: ['user'], // Default role
    isVerified: false, // User needs to verify their email
  });

  // Save the user to the database
  await newUser.save();

  // Generate a JWT token for the new user
  const token = generateToken({
    userId: newUser._id,
    roles: newUser.roles,
    isVerified: newUser.isVerified,
  });

  // Return relevant user data (excluding password hash) and the token
  return {
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
    token,
  };
}

/**
 * Logs in a user by verifying credentials.
 * Finds the user by username or email, compares the password, and generates a JWT token upon successful login.
 * @param {string} identifier - The user's username or email.
 * @param {string} password - The user's plain-text password.
 * @returns {Promise<object>} An object containing the user's public data and a JWT token.
 * @throws {Error} If credentials are invalid, or other login errors.
 */
async function loginUser(identifier, password) {
  // Find the user by username or email
  const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare the provided password with the stored password hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Update last login timestamp
  user.lastLogin = new Date();
  await user.save();

  // Generate a JWT token
  const token = generateToken({
    userId: user._id,
    roles: user.roles,
    isVerified: user.isVerified,
  });

  // Return relevant user data (excluding password hash) and the token
  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
}

module.exports = {
  registerUser,
  loginUser,
};