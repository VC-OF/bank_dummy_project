const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/, 'Please fill a valid email address'],
  },
  passwordHash: { // Stores the bcrypt hash of the user's password
    type: String,
    required: [true, 'Password hash is required'],
  },
  roles: {
    type: [String], // Array of strings
    enum: ['user', 'admin'], // Allowed roles for example
    default: ['user'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  profilePictureUrl: {
    type: String,
    trim: true,
    default: null,
  },
  // Add other profile information as needed
  // firstName: { type: String, trim: true },
  // lastName: { type: String, trim: true },
  // bio: { type: String, trim: true, maxlength: 500 },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;