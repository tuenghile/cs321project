require('dotenv').config();
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library'); // Import OAuth2Client directly

// OAuth2 credentials from Google Cloud
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

class EmailVerificationService {
  constructor() {
    this.verificationCodes = {}; // Store codes in memory for now
  }

  // Validate GMU email format
  validateGmuEmailFormat(email) {
    const gmuEmailPattern = /^[a-zA-Z0-9._%+-]+@gmu\.edu$/;
    return gmuEmailPattern.test(email);
  }

  // Send verification code to confirm ownership
  async sendVerificationCode(email) {
    const code = this.generateVerificationCode();
    this.verificationCodes[email] = code;

    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'gmulostandfound@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: 'gmulostandfound@gmail.com',
        to: email,
        subject: 'Verify your GMU email address',
        text: `Your verification code is: ${code}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
      return true;
    } catch (error) {
      console.error("Failed to send verification email:", error);
      return false;
    }
  }

  // Generate a random 6-digit verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Verify the code entered by the user
  verifyCode(email, code) {
    return this.verificationCodes[email] === code;
  }
}

module.exports = EmailVerificationService;