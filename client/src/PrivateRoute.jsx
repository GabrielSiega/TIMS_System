import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />; // Redirect to login if not an admin
  }

  return children; // Render the protected component if admin
};

export default PrivateRoute;
