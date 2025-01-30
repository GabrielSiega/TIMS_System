import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import facebookImage from './assets/images/facebook_logos_PNG19748.png';
import googleImage from './assets/images/google_icon.png';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/login", {
      email: formData.email,
      password: formData.password,
      role: formData.role
    })
      .then(result => {
        if (result.data.role !== 'admin') {
          setMessage("You do not have admin privileges.");
          setIsError(true);
          return;
        }

        setMessage("Login successful! Redirecting...");
        setIsError(false);

        // Store the token and role in localStorage
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);

        // Redirect after a short delay
        setTimeout(() => {
          setMessage("");
          navigate("/AdminDashboard"); // Redirect to the admin dashboard
        }, 3000);

        // Clear the input fields
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch(err => {
        console.error(err);
        setMessage("An error occurred. Please try again.");
        setIsError(true);

        // Clear Error message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);

        // Clear the input fields after an error
        setFormData({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div className="login-container">
      <div className="login-top"></div>
      <div className="login-card">
        <h2 className="login-header">Admin Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        {message && (
          <div className={`login-message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <div className="login-divider-container">
          <hr className="login-divider" /> <span className="login-or-text">or</span> 
          <hr className="login-divider" />
        </div>
        <div className="login-social-buttons">
          <button className="login-social-button">
            <img src={facebookImage} alt="Facebook" className="social-icon" />
            Facebook
          </button>
          <button className="login-social-button">
            <img src={googleImage} alt="Google" className="social-icon" />
            Google
          </button>
        </div>
        <p className="login-footer">
          Don't have an account? <Link to="/Signup" className="login-signup-link">Sign Up</Link>
        </p>
      </div>

      <p className="login-footer">
          Are you a student? <Link to="/Login" className="login-link">Back to Login page</Link>
        </p>

      {/* <p className="login-footer">
          Open User List <Link to="/Userlist" className="User-list-button">User List</Link>
      </p> */}
    </div>
  );
}

export default AdminLogin;
