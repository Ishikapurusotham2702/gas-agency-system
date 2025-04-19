const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  decision: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, 
  paymentMethod: String,
});

module.exports = mongoose.model('Booking', bookingSchema);