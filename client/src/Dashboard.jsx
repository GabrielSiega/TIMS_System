import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const [notification, setNotification] = useState("");
<<<<<<< HEAD
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60); // Countdown for logout after warning (15 minutes)
  const navigate = useNavigate();
  let idleTimer = null;
  let warningTimer = null;

  useEffect(() => {
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      clearTimeout(warningTimer);

      // Show warning after 10 minutes of inactivity
      idleTimer = setTimeout(() => {
        setShowIdleWarning(true);
        console.log("Inactivity detected. Starting countdown...");

        // Reset countdown to 15 minutes
        setCountdown(15 * 60);

        warningTimer = setInterval(() => {
          setCountdown((prev) => {
            console.log(`Previous countdown: ${prev}`); // Log previous countdown value

            if (prev <= 1) {
              clearInterval(warningTimer);
              handleLogout(true);
              return 0;
            }

            // Log countdown in each second
            console.log(`Time remaining: ${formatTime(prev)}`);
            return prev - 1;
          });
        }, 1000); // Update every second
      }, 10 * 1000); // After 10 seconds of inactivity
    };

    // Add event listeners for user activity
    const handleUserActivity = () => resetIdleTimer();
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Initialize idle timer
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(warningTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [navigate]);

  const handleLogout = (isIdle = false) => {
=======
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
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Set notification
<<<<<<< HEAD
    const logoutMessage = isIdle
      ? "You have been logged out due to inactivity!"
      : "You have successfully logged out!";
=======
    const logoutMessage = "You have successfully logged out!";
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
    setNotification(logoutMessage);

    // Store logout message in localStorage for page reloads
    localStorage.setItem("logoutMessage", logoutMessage);

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
<<<<<<< HEAD
    }, 1000); // 1 second delay for notification to show
  };

  const handleOkay = () => {
    setShowIdleWarning(false);
    clearTimeout(idleTimer);
    clearTimeout(warningTimer);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
=======
    }, 3000); // 3 seconds delay for notification to show
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
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

<<<<<<< HEAD
=======
        {/* Divider between Events and Attendance */}
        {/* <div className="divider"></div> */}

>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
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
<<<<<<< HEAD
        <button className="logout-btn" onClick={() => handleLogout(false)}>
=======
        <button className="logout-btn" onClick={handleLogout}>
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
          Logout
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
<<<<<<< HEAD

      {/* Idle Warning Modal */}
      {showIdleWarning && (
        <div className="modal">
          <div className="modal-content">
            <h4>Are you still there?</h4>
            <p>You will be logged out in {formatTime(countdown)} due to inactivity.</p>
            <button onClick={handleOkay}>Okay</button>
          </div>
        </div>
      )}
=======
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
    </div>
  );
};

export default Dashboard;
