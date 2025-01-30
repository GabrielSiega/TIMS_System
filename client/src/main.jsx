import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Signup.jsx';
import LoginPage from './Login.jsx'; 
import Dashboard from './Dashboard.jsx';
import Userlist from './Userlist.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './admin-dashboard.jsx';
import Editprofile from './Editprofile.jsx'

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

         Define the /AdminLogin route
         <Route path="/AdminLogin" element={<AdminLogin />} />

         Define the /AdminLogin route
         <Route path="/AdminDashboard" element={<AdminDashboard />} />

         Define the /Edit Profile route
         <Route path="/Editprofile" element={<Editprofile />} />

      </Routes>
    </Router>
  </StrictMode>
);
