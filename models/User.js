const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model('User', userSchema);

module.exports = User;
