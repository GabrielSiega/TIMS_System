<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MembersModel = require("./models/Members");  // Assuming you have a Members model
=======
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const nodemailer = require("nodemailer");
// // const MembersModel = require("./models/Members");

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // // Connect to MongoDB
// // mongoose.connect("mongodb://127.0.0.1:27017/Members", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // // // Nodemailer setup
// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail',
// // //   auth: {
// // //     user: 'your-email@gmail.com',
// // //     pass: 'your-email-password',  // Use an environment variable for security
// // //   },
// // // });

// // // Registration route
// // app.post('/register', async (req, res) => {
// //     const { name, email, password } = req.body;

// //     try {
// //         // Check if the email already exists
// //         const existingMember = await MembersModel.findOne({ email });
// //         if (existingMember) {
// //             return res.status(400).json({ message: 'Email already exists.' });
// //         }

// //         // Create a new member
// //         const newMember = await MembersModel.create({ name, email, password });

// //         // // Send confirmation email
// //         // const mailOptions = {
// //         //     from: 'your-email@gmail.com',
// //         //     to: email,
// //         //     subject: 'Registration Successful',
// //         //     text: `Hello ${name},\n\nThank you for registering on our platform.`,
// //         // };

// //         // transporter.sendMail(mailOptions, (err, info) => {
// //         //     if (err) {
// //         //       console.log("Error sending email: ", err);  // Log error details
// //         //       return res.status(500).json({ message: "Error sending email." });  // Optional: Return error to the client
// //         //     } else {
// //         //       console.log("Email sent: ", info.response);
// //         //     }
// //         //   });
          

// //         res.status(201).json(newMember);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // });

// // // Start the server
// // app.listen(3001, () => {
// //     console.log("Server is running on http://localhost:3001");
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const MembersModel = require("./models/Members");

// const jwt = require('jsonwebtoken');

// // Secret key (use environment variables in production)
// const SECRET_KEY = 'your_secret_key';

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/Members", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

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
//         res.status(201).json(newMember);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const member = await MembersModel.findOne({ email });
//       if (!member) {
//           return res.status(404).json({ message: "User not found." });
//       }

//       if (member.password !== password) {
//           return res.status(401).json({ message: "Invalid credentials." });
//       }

//       // Generate JWT
//       const token = jwt.sign(
//           { id: member._id, email: member.email }, // Payload
//           SECRET_KEY,                              // Secret key
//           { expiresIn: '1h' }                      // Token expiration
//       );

//       res.status(200).json({
//           message: "Login successful.",
//           token,
//           member: {
//               id: member._id,
//               name: member.name,
//               email: member.email
//           }
//       });
//   } catch (err) {
//       console.error("Error during login:", err);
//       res.status(500).json({ message: "Server error." });
//   }
// });


// // Start the server
// app.listen(3001, () => {
//     console.log("Server is running on http://localhost:3001");
// });




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const MembersModel = require("./models/Members");
const authenticateToken = require('./middleware/auth'); // Import the middleware
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Members", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Secret key for JWT
<<<<<<< HEAD
const JWT_SECRET = "your_secret_key";  // You should store this in environment variables for security
=======
const SECRET_KEY = 'your_secret_key';
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingMember = await MembersModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

<<<<<<< HEAD
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new member
        const newMember = await MembersModel.create({ name, email, password: hashedPassword });

=======
        const newMember = await MembersModel.create({ name, email, password });
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
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
<<<<<<< HEAD
        // Find the member by email
=======
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
        const member = await MembersModel.findOne({ email });
        if (!member) {
            return res.status(404).json({ message: "User not found." });
        }

<<<<<<< HEAD
        // Check if the password matches
        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: member._id, name: member.name, email: member.email },
            JWT_SECRET, // Secret key to sign the token
            { expiresIn: "1h" }  // Set expiration time for the token (optional)
        );

        // Return the token in the response
        res.status(200).json({
            message: "Login successful.",
            token: token  // Send the token to the client
        });

    } catch (err) {
        console.error(err);
=======
        if (member.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: member._id, email: member.email }, SECRET_KEY, { expiresIn: '30m' }); //Token expires in 30min

        res.status(200).json({
            message: "Login successful.",
            token,
            member: {
                id: member._id,
                name: member.name,
                email: member.email
            }
        });
    } catch (err) {
        console.error("Error during login:", err);
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
        res.status(500).json({ message: "Server error." });
    }
});

<<<<<<< HEAD
// Protected route to test token
app.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token using the secret key

        // You can now use the decoded data, like the user id, to fetch user details from the database
        const member = await MembersModel.findById(decoded.id);
        res.status(200).json({ member });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token.' });
    }
=======
// Dashboard route (secured by JWT middleware)
app.get('/dashboard', authenticateToken, (req, res) => {
    res.status(200).json({
        message: `Welcome to your dashboard, ${req.user.email}!`,
    });
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
