import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './Login.jsx'; // Make sure to create this component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Redirect the root path to /login */}
        <Route path="/" element={<Navigate to="/Login" />} />
        {/* Define the /login route */}
        <Route path="/Login" element={<LoginPage />} />
        {/* You can add other routes as needed
        <Route path="/home" element={<App />} /> */}
      </Routes>
    </Router>
  </StrictMode>
);
