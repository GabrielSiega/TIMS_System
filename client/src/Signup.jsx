import { useState } from "react";
import "./Signup.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

// Use different names for the images
import facebookImage from './assets/images/facebook_logos_PNG19748.png';
import googleImage from './assets/images/google_icon.png';

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",  // New state for role, defaulting to 'user'
  });

  const [message, setMessage] = useState(""); // Unified message state
  const [isError, setIsError] = useState(false); // State to track if the message is an error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,  // Include role in the submission
    })
      .then(result => {
        console.log(result);
        setMessage("Registration successful! You can log in.");
        setIsError(false); // Set error state to false

        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);

        // Clear the input fields
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",  // Reset role to default
        });
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data.message) {
          setMessage(err.response.data.message); // Display error message
        } else {
          setMessage("An error occurred. Please try again.");
        }
        setIsError(true); // Set error state to true

        // Clear Error message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);

        // Clear the input fields after an error
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",  // Reset role to default
        });
      });

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-top"></div>
      <div className="signup-card">
        <h2 className="signup-header">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Phone number / Username"
            value={formData.username}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          {/* Add role dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="signup-input"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="signup-register-button">
            Register
          </button>
        </form>

        {message && (
          <div className={`signup-message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="signup-divider-container">
          <hr className="signup-divider" /> <span className="signup-or-text">or</span>{" "}
          <hr className="signup-divider" />
        </div>
        <div className="signup-social-buttons">
          <button className="signup-social-button">
            <img src={facebookImage} alt="Facebook" className="social-icon" />
            Facebook
          </button>
          <button className="signup-social-button">
            <img src={googleImage} alt="Google" className="social-icon" />
            Google
          </button>
        </div>
        <p className="signup-footer">
          Already a member? <Link to="/login" className="signup-signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
