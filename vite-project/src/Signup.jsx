import { useState } from "react";
import "./Signup.css";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import axios from 'axios';

// Use different names for the images
import facebookImage from './assets/images/facebook_logos_PNG19748.png';
import googleImage from './assets/images/google_icon.png';

function Signup() {
  // Include email in the formData state
  const [formData, setFormData] = useState({
    username: "",
    email: "", // Add email here
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData with username, email, and password
    axios.post('http://localhost:3001/register', {
      username: formData.username,
      email: formData.email, // Include email here
      password: formData.password
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="signup-container">
      {/* Top section with a background color */}
      <div className="signup-top">
      </div>

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
            type="email" // Change input type to email
            name="email"
            placeholder="Email"
            value={formData.email} // Bind email value to state
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
          <button type="submit" className="signup-register-button">
            Register
          </button>
        </form>
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
