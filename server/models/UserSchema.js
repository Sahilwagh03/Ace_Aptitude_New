const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  githubId: {
    type: String,
    unique: true,
  },
  // Add any other user information fields here as needed
});

const User = mongoose.model('users', userSchema);

module.exports = User;
