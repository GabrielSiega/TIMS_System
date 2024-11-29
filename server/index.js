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

        // Create a new member if no duplicates are found
        const newMember = await MembersModel.create({ name, email, password });
        res.status(201).json(newMember);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});