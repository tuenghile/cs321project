const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const EmailVerificationService = require('./EmailVerificationService');

const app = express();
const emailService = new EmailVerificationService();

app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies

// Endpoint to send verification email
app.post('/send-verification-email', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!emailService.validateGmuEmailFormat(email)) {
    return res.status(400).json({ message: 'Please use a valid @gmu.edu email address.' });
  }

  // Send verification code
  const success = await emailService.sendVerificationCode(email);
  if (success) {
    res.status(200).json({ message: 'Verification email sent.' });
  } else {
    res.status(500).json({ message: 'Failed to send verification email.' });
  }
});

// Endpoint to verify the code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  const isValid = emailService.verifyCode(email, code);
  if (isValid) {
    res.status(200).json({ message: 'Email verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid verification code.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

