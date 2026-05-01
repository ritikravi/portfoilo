const router = require('express').Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token });
});

// Change password — updates process.env for current session
// For permanent change, also update ADMIN_PASSWORD in .env / Render dashboard
router.post('/change-password', auth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (currentPassword !== adminPassword) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  process.env.ADMIN_PASSWORD = newPassword;
  res.json({ message: 'Password updated successfully' });
});

module.exports = router;
