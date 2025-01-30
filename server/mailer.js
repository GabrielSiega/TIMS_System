// const nodemailer = require('nodemailer');

// // Create a transporter using Yahoo SMTP settings
// const transporter = nodemailer.createTransport({
//   service: 'yahoo',
//   auth: {
//     user: 'gabriel.siega@yahoo.com', // Your Yahoo email
//     pass: 'hghneprxstrrmzqi', // Your Yahoo email password or an app password
//   },
// });

// // Set up the email details
// const mailOptions = {
//   from: 'gabriel.siega@yahoo.com', // Sender email (your own)
//   to: 'gabriel.siega@yahoo.com',   // Recipient email (you)
//   subject: 'Password Reset Request', // Subject of the email
//   text: 'Here is your password reset link:  http://localhost:5173/reset-password', // The content of the email
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error sending email:', error);
//     return;
//   }
//   console.log('Password reset email sent: ' + info.response);
// });
