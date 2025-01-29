import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Signup.jsx';
import LoginPage from './Login.jsx'; 
import Dashboard from './Dashboard.jsx';
import Userlist from './Userlist.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Redirect the root path to /login */}
        <Route path="/" element={<Navigate to="/Login" />} />

        {/* Define the /Signup route */}
        <Route path="/Signup" element={<Signup />} />

        {/* Define the /login route */}
        <Route path="/Login" element={<LoginPage />} />

        {/* Define the /Dashboard route */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Define the /Userlist route */}
        <Route path="/Userlist" element={<Userlist />} />

      </Routes>
    </Router>
  </StrictMode>
);
