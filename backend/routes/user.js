const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// BOOK a new cylinder
router.post('/book', verifyToken, async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const user = await User.findById(req.user.id);

    if (user.barrelsRemaining <= 0) {
      return res.status(400).json({ msg: "No barrels remaining for this year." });
    }

    const newBooking = new Booking({
      userId: user._id,
      paymentMethod,
      status: 'Pending'
    });

    await newBooking.save();

    user.barrelsRemaining -= 1;
    await user.save();

    // Send email notification
    await sendEmail(
      user.email,
      'Gas Cylinder Booking Confirmed',
      `<p>Dear ${user.name},</p>
      <p>Your cylinder has been booked successfully. You have ${user.barrelsRemaining} barrels left for this year.</p>
      <p>Payment Method: <b>${paymentMethod}</b></p>`
    );

    res.status(201).json({ msg: 'Booking created', booking: newBooking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all bookings for the logged-in user
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get user profile (barrels left, etc.)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
