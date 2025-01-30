import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';



function EditProfile() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [userToken, setUserToken] = useState(null); // To store the user's token
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();

    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token); // Store token in state
    } else {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/members');
      const filteredUsers = response.data.filter(user => user.role !== 'admin'); // Exclude admin users
      setUsers(filteredUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      setMessage('Error fetching users. Please try again.');
      setIsError(true);
    }
  };

  const handleUpdateUser = async (userId) => {
    const updatedData = {
      username: editingUser.username,
      email: editingUser.email,
      role: editingUser.role,
    };
    try {
      await axios.put(`http://localhost:3001/members/${userId}`, updatedData);
      fetchUsers();
      setEditingUser(null);
      setMessage("User updated successfully!");
      setIsError(false);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage('Error updating user. Please try again.');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/members/${userId}`);
      fetchUsers();
      setMessage("User deleted successfully!");
      setIsError(false);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Error deleting user. Please try again.');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    }
  };

  const handleResetPassword = async (userId) => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    try {
      await axios.put(`http://localhost:3001/members/reset-password/${userId}`, { password: newPassword });
      setMessage("Password reset successfully!");
      setIsError(false);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    } catch (err) {
      console.error('Error resetting password:', err);
      setMessage('Error resetting password. Please try again.');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000); // Auto-hide message
    }
  };

  const goBackToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="user-list-container">
      <h2>Edit Account Info</h2>
      <button onClick={goBackToDashboard}>Go Back to Dashboard</button>
      
      {/* Display the user's token */}
      <div className="user-token">
        <p><strong>User Token:</strong> {userToken || "No token found"}</p>
      </div>

      {message && <div className={isError ? "error" : "success"}>{message}</div>}
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                <button className="reset-password-button" onClick={() => handleResetPassword(user._id)}>Reset Password</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit User Form */}
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <input 
            type="text" 
            name="username" 
            value={editingUser.username} 
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} 
          />
          <input 
            type="email" 
            name="email" 
            value={editingUser.email} 
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} 
          />
          <select 
            name="role" 
            value={editingUser.role} 
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => handleUpdateUser(editingUser._id)}>Update User</button>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
