const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  Name:{
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  },
  googleId: {
    type: String,
  },
  profileImage:{
    type:String
  },
  tests: [{ type: Schema.Types.ObjectId, ref: 'tests' }],
  // Add any other user information fields here as needed
});

const User = mongoose.model('users', userSchema);

module.exports = User;
