const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  // Add any other user information fields here as needed
});

const User = mongoose.model('users', userSchema);

module.exports = User;
