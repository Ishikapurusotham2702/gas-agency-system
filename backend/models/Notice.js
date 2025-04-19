const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', noticeSchema);