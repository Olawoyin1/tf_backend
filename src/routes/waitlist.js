const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');
const { sendConfirmationEmail } = require('../services/emailService');

// POST /api/waitlist — Register a new entry
router.post('/', async (req, res) => {
  try {
    const { fullName, email, interest, company } = req.body;

    // Basic validation
    if (!fullName || !email || !interest) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and interest are required.',
      });
    }

    // Check for duplicate
    const existing = await Waitlist.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on the waitlist.',
        position: existing.position,
      });
    }

    // Create entry
    const entry = new Waitlist({ fullName, email, interest, company });
    await entry.save();

    // Send confirmation email (non-blocking — don't fail registration if email fails)
    try {
      await sendConfirmationEmail({
        fullName: entry.fullName,
        email: entry.email,
        position: entry.position,
      });
      entry.confirmationSent = true;
      await entry.save();
    } catch (emailErr) {
      console.error('[Email Failed] Message:', emailErr.message);
      console.error('[Email Failed] RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
      console.error('[Email Failed] FROM_EMAIL:', process.env.FROM_EMAIL);
      console.error('[Email Failed] Stack:', emailErr.stack);
    }

    return res.status(201).json({
      success: true,
      message: `Welcome to the waitlist, ${fullName.split(' ')[0]}! You are #${entry.position}.`,
      data: {
        position: entry.position,
        email: entry.email,
        fullName: entry.fullName,
      },
    });
  } catch (err) {
    console.error('[Register Error]', err);

    // Handle mongoose duplicate key (race condition)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on the waitlist.',
      });
    }

    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong: ' + (err.message || err.toString()),
      stack: err.stack,
    });
  }
});

// GET /api/waitlist/admin — Secure route to fetch all registrations
router.get('/admin', async (req, res) => {
  try {
    const adminEmail = req.headers['x-admin-email'];
    const adminPassword = req.headers['x-admin-password'];
    
    // Check email and password
    if (
      !adminEmail || 
      !adminPassword || 
      adminEmail.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase() || 
      adminPassword !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const entries = await Waitlist.find().sort({ position: 1 });
    return res.status(200).json({ success: true, data: entries });
  } catch (err) {
    console.error('[Admin Fetch Error]', err);
    return res.status(500).json({ success: false, message: 'Could not fetch entries.' });
  }
});

// GET /api/waitlist/count — Public count of registrations
router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    return res.status(200).json({ success: true, count });
  } catch (err) {
    console.error('[Count Error]', err);
    return res.status(500).json({ success: false, message: 'Could not fetch count.' });
  }
});

module.exports = router;
