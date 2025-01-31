import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';


// 1. Authentication Check on Page Load (useEffect)
// When the component mounts, it checks if the user is authenticated by retrieving the token from localStorage.
// If no token is found, the user is redirected to the /login page.
// If the token exists, it:
// Retrieves the user's name from localStorage and sets it in state.
// Attempts to retrieve and display a logout message (if it exists), which is cleared after 3 seconds.


const Dashboard = () => {
  const [notification, setNotification] = useState("");
  const [userName, setUserName] = useState("");  
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // To manage the confirmation state
  const [loggingOut, setLoggingOut] = useState(false); // To manage the logout process notification
  const [userToken, setUserToken] = useState(""); // To store the token
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
      return;
    }

    // Fetch stored user name
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch stored token
    setUserToken(token); // Store the token

// 2. Logout Process
// Logout Confirmation
// When the "Logout" button is clicked:
// It displays a confirmation popup (handled by setShowLogoutConfirmation(true)).

    // Check for and display logout message once
    const logoutMessage = localStorage.getItem("logoutMessage");
    if (logoutMessage) {
      setNotification(logoutMessage);
      
      // Remove logout message from localStorage after displaying
      setTimeout(() => {
        localStorage.removeItem("logoutMessage");
        setNotification("");
      }, 3000);
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    // Display the confirmation dialog
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    // Clear stored data
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Set "Logging out" notification
    setLoggingOut(true);
    setNotification("You are logging out...");

    // Set Login notification
    localStorage.setItem("logoutMessage", "You have successfully logged In!");

    // Redirect to login page after a delay
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const cancelLogout = () => {
    // Hide the confirmation dialog without logging out
    setShowLogoutConfirmation(false);
  };

  // 3. Navigation and UI Features
  // Sidebar Navigation
  
  // Allows the user to navigate between:
  // Edit Profile
  // Attendance
  // Calendar
  // Main Dashboard Content
  // Displays a welcome message using the stored userName or defaults to "User".
  // Shows upcoming events.
  // Displays attendance progress.
  // Floating Logout Button
  // Always available for users to log out conveniently.

  return (
    <div className="dashboard-container">
      {/* Sidebar - Activity Bar */}
      <div className="sidebar">
        <h3>Activity</h3>
        <ul>
          <li onClick={() => navigate("/Editprofile")}>Edit Profile</li>
          <li onClick={() => navigate("/attendance")}>Attendance</li>
          <li onClick={() => navigate("/calendar")}>Calendar</li>
        </ul>
      </div>

      {/* Main Dashboard Content */}
      <div className="main-content">
        {/* Header Section */}
        <div className="header">
          <h1>Tech Innovators</h1>
          <h2>Dashboard</h2>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message">
          <h3>Welcome, {userName || "User"}!</h3>
        </div>

        <div className="divider"></div>

        {/* Display User Token
        <div className="token-display">
          <h4>Your Token:</h4>
          <p>{userToken}</p>
        </div> */}

        {/* Main Content */}
        <div className="content">
          {/* Events Section */}
          <div className="events-section">
            <h3>Events</h3>
            <div className="event-card upcoming-events">
              <h4>Upcoming Events</h4>
              <ul>
                <li>System Workshop on December 29, 2024</li>
                <li>New Feature Release on December 31, 2024</li>
                <li>User Training Session on January 1, 2025</li>
              </ul>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="attendance-section">
            <h3>Attendance Record</h3>
            <div className="attendance-card">
              <div className="attendance-progress">
                <p>50%</p>
                <p>15/30 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Logout Button */}
        <div className="floating-logout-btn">
          <button onClick={handleLogoutClick}>Logout</button>
        </div>

        {/* Floating Logout Confirmation Message */}
        {showLogoutConfirmation && (
          <div className="floating-logout-message">
            <p>Are you sure you want to log out?</p>
            <button onClick={confirmLogout}>Yes</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        )}

        {/* Notification Display */}
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default Dashboard;








// My Dashboard.jsx works by handling user authentication and managing the logout process using React state, 
// localStorage, and React Router. Here’s a breakdown of how it functions:

// 1. Authentication Check on Page Load (useEffect)
// When the component mounts, it checks if the user is authenticated by retrieving the token from localStorage.
// If no token is found, the user is redirected to the /login page.
// If the token exists, it:
// Retrieves the user's name from localStorage and sets it in state.
// Attempts to retrieve and display a logout message (if it exists), which is cleared after 3 seconds.


// 2. Logout Process
// Logout Confirmation
// When the "Logout" button is clicked:
// It displays a confirmation popup (handled by setShowLogoutConfirmation(true)).

// The user has two options:
// Confirm logout (confirmLogout()):
// Clears localStorage (removes the token and username).
// Displays a "You are logging out..." message.
// Sets a logout notification (localStorage.setItem("logoutMessage", "You have successfully logged in!");).
// Redirects to /login after 3 seconds.
// Cancel logout (cancelLogout()):
// Simply hides the confirmation popup.


// 3. Navigation and UI Features
// Sidebar Navigation

// Allows the user to navigate between:
// Edit Profile
// Attendance
// Calendar
// Main Dashboard Content
// Displays a welcome message using the stored userName or defaults to "User".
// Shows upcoming events.
// Displays attendance progress.
// Floating Logout Button
// Always available for users to log out conveniently.
