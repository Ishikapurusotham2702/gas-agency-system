const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Notice = require('../models/Notice');
const sendEmail = require('../utils/emailService');

// Middleware: allow only admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admins only' });
  }
  next();
};

// Get all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all bookings
router.get('/bookings', verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email username').sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Approve/Reject a booking
router.put('/decision/:bookingId', verifyToken, isAdmin, async (req, res) => {
  const { decision } = req.body;

  try {
    const booking = await Booking.findById(req.params.bookingId).populate('userId');

    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    booking.decision = decision;
    await booking.save();

    await sendEmail(
      booking.userId.email,
      `Booking ${decision}`,
      `<p>Hello ${booking.userId.name},</p><p>Your booking request has been <b>${decision}</b> by admin.</p>`
    );

    res.json({ msg: `Booking ${decision}`, booking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Post a new notice
router.post('/notice', verifyToken, isAdmin, async (req, res) => {
  const { message } = req.body;

  try {
    const notice = new Notice({ message });
    await notice.save();
    res.status(201).json({ msg: 'Notice created', notice });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all notices (for display to users)
router.get('/notice', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
