import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }

    // Check for a stored logout message
    const logoutMessage = localStorage.getItem("logoutMessage");
    if (logoutMessage) {
      setNotification(logoutMessage);
      localStorage.removeItem("logoutMessage"); // Clear the message
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Set notification
    const logoutMessage = "You have successfully logged out!";
    setNotification(logoutMessage);

    // Store logout message in localStorage for page reloads
    localStorage.setItem("logoutMessage", logoutMessage);

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 seconds delay for notification to show
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Tech Innovators</h1>
        <h2>Dashboard</h2>
      </div>

      {/* Divider between Header and Content */}
      <div className="divider"></div>

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

        {/* Divider between Events and Attendance */}
        {/* <div className="divider"></div> */}

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

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
