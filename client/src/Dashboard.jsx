import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

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

        {/* Display User Token */}
        <div className="token-display">
          <h4>Your Token:</h4>
          <p>{userToken}</p>
        </div>

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
