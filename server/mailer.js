const nodemailer = require('nodemailer');

// Create a transporter with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or another service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',  // If 2FA is enabled, use an App Password
  },
});

// Email options
const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient-email@example.com',
  subject: 'Test Email',
  text: 'Hello, this is a test email.',
};

// Send the email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Email sent:', info.response);
  }
});
