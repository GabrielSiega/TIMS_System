import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
<<<<<<< HEAD
import Dashboard from './Dashboard';
=======
// import Dashboard from './Dashboard';
import Dashboard from "./Dashboard"; // Import the Dashboard component
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
<<<<<<< HEAD
        <Route path='/dashboard' element={<Dashboard/>}/>
=======
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route to Dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
>>>>>>> 483b593942aba67208fe7b42fae16c40b496c9e3
      </Routes>
    </BrowserRouter>
  );
}

export default App;
