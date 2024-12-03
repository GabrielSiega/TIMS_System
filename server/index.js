const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MembersModel = require("./models/Members");
const bcrypt = require('bcrypt');


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
        const existingMember = await MembersModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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
  
        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
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
