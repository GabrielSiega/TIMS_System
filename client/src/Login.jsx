import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//What is Axios?
// Axios is a JavaScript library used for making HTTP requests (like GET, POST, PUT, DELETE)
// from a browser or Node.js. It is based on Promises, making it easier to handle asynchronous
//  requests compared to the traditional fetch API.

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

// 1. Capturing User Input
// The useState hook stores user input (email and password) in the formData state.
// The handleChange function updates the state whenever the user types in the input fields.

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
    
// 3. Submitting the Form
// When the user submits the form (handleSubmit), the app:
// Prevents default form submission (e.preventDefault()).
// Calls validateForm() to check if the form is properly filled.
// Sends a POST request to http://localhost:3001/login with the email and password.

    if (!validateForm()) return;

// 2. Form Validation
// The validateForm function checks if both fields are filled before submitting.
// If any field is empty, an error message is displayed.

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

// 4. Handling the API Response
// If the login is successful:
// The response contains a token (result.data.token), which is stored in localStorage for authentication.
// A success message is displayed.
// The user is redirected to /dashboard after 3 seconds.
// The input fields are cleared.


        // Redirect after a short delay
        setTimeout(() => {
          setMessage("");
          navigate("/dashboard");
        }, 3000);

//Redirects to dashboard when user inputs correct credentials

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

// If there’s an error (wrong credentials, server error, etc.):
// An error message is displayed.
// The password field is cleared, but the email is retained for convenience.
// The error message disappears after 3 seconds.

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

// 5. Loading State
// A loading state (isLoading) ensures the user cannot submit multiple requests while waiting for the response.
// The button text changes to "Logging In..." while the request is in progress.


  return (
    <div className="login-container">
      <div className="login-top"></div>
      <div className="login-card">
        <h2 className="login-header">Log In as User</h2>
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

      {/* <p className="login-footer">
        Open User List <Link to="/Userlist" className="User-list-button">User List</Link>
      </p> */} 
      
      {/* for testing only ^*/}
        
      <p className="login-footer">
        Open Admin Login <Link to="/AdminLogin" className="Admin-login-button">Admin Login</Link>
      </p>
    </div>
  );
}

// 7. Additional Features
// Social login buttons (Facebook, Google) are included but not yet functional.
// There are links for signing up, admin login, and user list (commented out for testing).


export default Login;



//NOTES//

// 1. Capturing User Input
// The useState hook stores user input (email and password) in the formData state.
// The handleChange function updates the state whenever the user types in the input fields.

// 2. Form Validation
// The validateForm function checks if both fields are filled before submitting.
// If any field is empty, an error message is displayed.

// 3. Submitting the Form
// When the user submits the form (handleSubmit), the app:
// Prevents default form submission (e.preventDefault()).
// Calls validateForm() to check if the form is properly filled.
// Sends a POST request to http://localhost:3001/login with the email and password.

// 4. Handling the API Response
// If the login is successful:
// The response contains a token (result.data.token), which is stored in localStorage for authentication.
// A success message is displayed.
// The user is redirected to /dashboard after 3 seconds.
// The input fields are cleared.

// If there’s an error (wrong credentials, server error, etc.):
// An error message is displayed.
// The password field is cleared, but the email is retained for convenience.
// The error message disappears after 3 seconds.


// 5. Loading State
// A loading state (isLoading) ensures the user cannot submit multiple requests while waiting for the response.
// The button text changes to "Logging In..." while the request is in progress.


// 6. Token-Based Authentication
// The token stored in localStorage allows the backend to recognize the user in future requests.
// The frontend can use this token for protected routes (e.g., accessing /dashboard).
// Typically, the backend would require this token in the Authorization header for secure API calls.


// 7. Additional Features
// Social login buttons (Facebook, Google) are included but not yet functional.
// There are links for signing up, admin login, and user list (commented out for testing).
