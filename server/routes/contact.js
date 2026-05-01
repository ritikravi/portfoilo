const router = require('express').Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Create transporter — uses Gmail App Password
function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your login password)
    },
  });
}

async function sendNotification({ name, email, subject, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return; // skip if not configured

  const transporter = getTransporter();

  // Email to Ritik
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: 'ritikravi7724@gmail.com',
    subject: `📬 New message from ${name}${subject ? ` — ${subject}` : ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9fafb; padding: 32px; border-radius: 12px;">
        <h2 style="color: #6366f1; margin: 0 0 24px;">New Portfolio Message</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 80px;">From</td><td style="padding: 8px 0; font-weight: 600; color: #111;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td></tr>
          ${subject ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject</td><td style="padding: 8px 0; color: #111;">${subject}</td></tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #6366f1;">
          <p style="color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
    replyTo: email, // hitting Reply goes straight to the sender
  });

  // Auto-reply to sender
  await transporter.sendMail({
    from: `"Ritik Raushan" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name.split(' ')[0]}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9fafb; padding: 32px; border-radius: 12px;">
        <h2 style="color: #6366f1; margin: 0 0 16px;">Hey ${name.split(' ')[0]} 👋</h2>
        <p style="color: #374151; line-height: 1.7;">Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
        <div style="margin: 20px 0; padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #6366f1;">
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Your message:</p>
          <p style="color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #374151; line-height: 1.7;">In the meantime, feel free to check out my projects on <a href="https://github.com/ritikravi" style="color: #6366f1;">GitHub</a> or connect on <a href="https://www.linkedin.com/in/ritik-raushan-626584383/" style="color: #6366f1;">LinkedIn</a>.</p>
        <p style="color: #374151; margin-top: 24px;">— Ritik Raushan</p>
      </div>
    `,
  });
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // Save to DB
    await Contact.create({ name, email, subject, message });

    // Send emails (non-blocking — don't fail the request if email fails)
    sendNotification({ name, email, subject, message }).catch(err =>
      console.error('Email send failed:', err.message)
    );

    res.status(201).json({ message: "Message received! I'll get back to you soon." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/read', auth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
