import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './EditProfile.css';

function EditProfile() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user data from localStorage or API
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Ideally fetch user data from API, using the stored token
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setMessage('Error fetching user data.');
        setIsError(true);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.put(
        'http://localhost:3001/profile',
        { username: user.username, email: user.email, password: user.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully!');
      setIsError(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Error updating profile. Please try again.');
      setIsError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      {message && <div className={isError ? 'error' : 'success'}>{message}</div>}

      <div className="profile-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default EditProfile;
