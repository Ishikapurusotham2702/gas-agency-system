const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  barrelsRemaining: { type: Number, default: 12 },
});

module.exports = mongoose.model('User', userSchema);