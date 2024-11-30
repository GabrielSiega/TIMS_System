import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to your Dashboard!</h2>
      {/* You can display additional user data here */}
    </div>
  );
};

export default Dashboard;
