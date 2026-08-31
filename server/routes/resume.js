const express = require('express');
const router = express.Router();
const path = require('path');

// Simple password check endpoint
router.post('/verify', (req, res) => {
  const { password } = req.body;
  const RESUME_PASSWORD = process.env.RESUME_PASSWORD || 'ritik2026';
  
  if (password === RESUME_PASSWORD) {
    return res.json({ success: true, token: 'authenticated' });
  }
  
  res.status(401).json({ success: false, message: 'Incorrect password' });
});

module.exports = router;
