const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MembersModel = require("./models/Members");  

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Members", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Secret key for JWT (store this in an env variable in production)
const JWT_SECRET = "your_secret_key";  

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
        const member = await MembersModel.findOne({ email });
        if (!member) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: member._id, name: member.name, email: member.email },
            JWT_SECRET,
            { expiresIn: "1h" }  
        );

        res.status(200).json({
            message: "Login successful.",
            token: token,  
            role: member.role // Include the role if you have it in your schema
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

// Protected profile route
app.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const member = await MembersModel.findById(decoded.id);
        res.status(200).json({ member });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token.' });
    }
});

// Get all members
app.get('/members', async (req, res) => {
    try {
        const users = await MembersModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
});

// Add new user route
app.post('/members', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingMember = await MembersModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new MembersModel({
            username, email, password: hashedPassword, role,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding user.' });
    }
});

// Update user route
app.put('/members/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, role, password } = req.body;

    try {
        let updateData = { username, email, role };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await MembersModel.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user route
app.delete('/members/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await MembersModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

app.put('/members/reset-password/:id', async (req, res) => { 
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password for security
    await MembersModel.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
});


app.get('/profile', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    // If token is valid, send user data
    res.json(user);
  });
});


// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
