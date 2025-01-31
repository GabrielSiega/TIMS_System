import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// StrictMode: Helps detect potential problems in your app by running additional checks in development mode.

// createRoot: Initializes the React app and renders components into the DOM.

// What is the DOM? (Document Object Model)
// The DOM turns an HTML document into a structured tree.
// Each HTML element becomes a node in this tree.
// JavaScript can add, remove, or modify elements in this tree.

// BrowserRouter (Router): Manages navigation and allows you to use routes.
// Routes & Route: Define different paths (URLs) in the app.
// Navigate: Redirects users from one route to another.

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

        {/* The app is rendered inside root, which is usually inside index.html.
        <StrictMode> ensures better debugging in development.
        <Router> wraps the entire application to enable routing.
        <Routes> contains all the possible routes/pages. */}


        {/* Each of these components represents a different page in my app.
      They will be displayed based on the current URL. */}

        {/* Redirect the root path to /login */}
        <Route path="/" element={<Navigate to="/Login" />} />
 
        {/*Redirects the root URL (/) to the login page (/Login).
        This ensures users always start from the login page. */}

        {/* Define the /Signup route */}
        <Route path="/Signup" element={<Signup />} />

        {/* Define the /login route */}
        <Route path="/Login" element={<LoginPage />} />

        {/* Define the /Dashboard route */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Define the /Userlist route */}
        <Route path="/Userlist" element={<Userlist />} />

        {/* Define the /AdminLogin route*/}
        <Route path="/AdminLogin" element={<AdminLogin />} />

        {/* Define the /AdminLogin route*/}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/*Define the /Edit Profile route*/}
        <Route path="/Editprofile" element={<Editprofile />} />

      </Routes>
    </Router>
  </StrictMode>
);
