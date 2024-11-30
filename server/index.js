// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const MembersModel = require("./models/Members");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/Members", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // // Nodemailer setup
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'your-email@gmail.com',
// //     pass: 'your-email-password',  // Use an environment variable for security
// //   },
// // });

// // Registration route
// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if the email already exists
//         const existingMember = await MembersModel.findOne({ email });
//         if (existingMember) {
//             return res.status(400).json({ message: 'Email already exists.' });
//         }

//         // Create a new member
//         const newMember = await MembersModel.create({ name, email, password });

//         // // Send confirmation email
//         // const mailOptions = {
//         //     from: 'your-email@gmail.com',
//         //     to: email,
//         //     subject: 'Registration Successful',
//         //     text: `Hello ${name},\n\nThank you for registering on our platform.`,
//         // };

//         // transporter.sendMail(mailOptions, (err, info) => {
//         //     if (err) {
//         //       console.log("Error sending email: ", err);  // Log error details
//         //       return res.status(500).json({ message: "Error sending email." });  // Optional: Return error to the client
//         //     } else {
//         //       console.log("Email sent: ", info.response);
//         //     }
//         //   });
          

//         res.status(201).json(newMember);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Start the server
// app.listen(3001, () => {
//     console.log("Server is running on http://localhost:3001");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MembersModel = require("./models/Members");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Members", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingMember = await MembersModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create a new member
        const newMember = await MembersModel.create({ name, email, password });
        res.status(201).json(newMember);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the member by email
      const member = await MembersModel.findOne({ email });
      if (!member) {
          return res.status(404).json({ message: "User not found." });
      }

      // Check if the password matches
      if (member.password !== password) {
          return res.status(401).json({ message: "Invalid credentials." });
      }

      // Successful login response
      res.status(200).json({
          message: "Login successful.",
          member: {
              id: member._id,
              name: member.name,
              email: member.email
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
  }
});


// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
