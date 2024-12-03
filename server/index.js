const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MembersModel = require("./models/Members");  // Assuming you have a Members model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Members", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Secret key for JWT
const JWT_SECRET = "your_secret_key";  // You should store this in environment variables for security

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingMember = await MembersModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new member
        const newMember = await MembersModel.create({ name, email, password: hashedPassword });

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
        res.status(500).json({ message: "Server error." });
    }
});

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
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
