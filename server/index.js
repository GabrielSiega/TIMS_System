const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MembersModel = require("./models/Members");
const nodemailer = require("nodemailer");

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

// Create Nodemailer transporter with Yahoo's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Yahoo", // Use 'Yahoo' as the service
  auth: {
    user: "gabriel.siega@yahoo.com", // Your Yahoo email address
    pass: "hghneprxstrrmzqi", // Your App Password for Yahoo (NOT your regular Yahoo password)
  },
});

app.get("/members", async (req, res) => {
  try {
    const users = await MembersModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching users." });
  }
});

// Backend route to add a user
app.post("/members", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new MembersModel({ username, email, password, role });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Error adding user. Please try again." });
  }
});

// Registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingMember = await MembersModel.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = await MembersModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
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
      role: member.role, // Include the role if you have it in your schema
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// Password reset request route
app.post("/members/reset-password-request", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await MembersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create reset token (You can use JWT or a random token for the reset link)
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send email with reset password link
    const resetLink = `http://localhost:3001/reset-password/${resetToken}`;

    const mailOptions = {
      from: "gabriel.siega@yahoo.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error sending email" });
      }

      res.status(200).json({ message: "Password reset email sent successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing password reset request" });
  }
});

// app.put("/members/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const { username, email, password, role } = req.body;

//   if (!username || !email || !password || !role) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     console.log("Updating user with ID:", userId); // Debug log
//     const user = await MembersModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user fields
//     user.username = username;
//     user.email = email;
//     user.password = await bcrypt.hash(password, 10); // Hash the new password
//     user.role = role;

//     // Save the updated user data
//     const updatedUser = await user.save();
//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (err) {
//     console.error("Error stack:", err.stack);  // Log the full error stack for debugging
//     res.status(500).json({ message: "Error updating user. Please try again.", error: err.message });
//   }
// });


// PUT /members/:userId to update user information
app.put("/members/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, role } = req.body;

  if (!username || !email || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    console.log("Updating user with ID:", userId); // Debug log
    const user = await MembersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.username = username;
    user.email = email;
    user.role = role;

    if (password) {
      // Hash the new password only if it's provided
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user data
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error stack:", err.stack);  // Log the full error stack for debugging
    res.status(500).json({ message: "Error updating user. Please try again.", error: err.message });
  }
});




// Handle password reset using the token
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await MembersModel.findById(decoded.id);

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});


app.delete("/members/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await MembersModel.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user. Please try again." });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
