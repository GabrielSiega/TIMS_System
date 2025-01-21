import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Login.jsx'; // Make sure to create this component
import Dashboard from './Dashboard.jsx';
import Signup from './Signup.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Redirect the root path to /login */}
        <Route path="/" element={<Navigate to="/Login" />} />
        {/* Define the /login route */}
        <Route path="/Login" element={<LoginPage />} />
        {/* Define the /Signup route */}
        <Route path="/Signup" element={<Signup />} />
           {/* Define the /Dashboard route */}
           <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  </StrictMode>
);
