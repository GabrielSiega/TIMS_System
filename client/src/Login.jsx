import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import facebookImage from './assets/images/facebook_logos_PNG19748.png';
import googleImage from './assets/images/google_icon.png';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validate form before submitting
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage("Please fill in both fields.");
      setIsError(true);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);  // Set loading state to true
    axios.post("http://localhost:3001/login", {
      email: formData.email,
      password: formData.password,
    })
      .then(result => {
        setMessage("Login successful! Redirecting...");
        setIsError(false);

        // Store the token in localStorage
        localStorage.setItem("token", result.data.token);

        // Redirect after a short delay
        setTimeout(() => {
          setMessage("");
          navigate("/dashboard");
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

        // Retain the email field after error and clear the password
        setFormData({
          email: formData.email,
          password: "",
        });
      })
      .finally(() => {
        setIsLoading(false);  // Reset loading state
      });
  };

  return (
    <div className="login-container">
      <div className="login-top"></div>
      <div className="login-card">
        <h2 className="login-header">Log In</h2>
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
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
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
        Open User List <Link to="/Userlist" className="User-list-button">User List</Link>
      </p>
        
      <p className="login-footer">
        Open Admin Login <Link to="/AdminLogin" className="Admin-login-button">Admin Login</Link>
      </p>
    </div>
  );
}

export default Login;
