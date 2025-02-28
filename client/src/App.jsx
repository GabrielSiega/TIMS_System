import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
