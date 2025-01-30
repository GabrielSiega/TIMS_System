import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Userlist.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Users Function
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/members');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setMessage('Error fetching users. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Form Input Changes
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add New User
  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      setMessage("All fields are required!");
      setIsError(true);
      return;
    }
    try {
      await axios.post('http://localhost:3001/members', newUser);
      fetchUsers();
      setNewUser({ username: '', email: '', role: 'user', password: '' });
      setMessage("New user added successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error adding user:', err);
      setMessage('Error adding user. Please try again.');
      setIsError(true);
    }
  };

  // Update User
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
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage('Error updating user. Please try again.');
      setIsError(true);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/members/${userId}`);
      fetchUsers();
      setMessage("User deleted successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Error deleting user. Please try again.');
      setIsError(true);
    }
  };

  // Reset User Password
  const handleResetPassword = async (userId) => {
    const confirmReset = window.confirm("Are you sure you want to reset this user's password?");
    if (!confirmReset) return;

    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    try {
      await axios.put(`http://localhost:3001/members/reset-password/${userId}`, { password: newPassword });
      setMessage("Password reset successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error resetting password:', err);
      setMessage('Error resetting password. Please try again.');
      setIsError(true);
    }
  };

  // Send Reset Password Email
  const handleSendResetEmail = async (userId) => {
    try {
      await axios.post(`http://localhost:3001/members/send-reset-password-email/${userId}`);
      setMessage("Reset password email sent successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error sending reset email:', err);
      setMessage('Error sending reset password email. Please try again.');
      setIsError(true);
    }
  };

  // Go Back to Login Page
  const goBackToLogin = () => {
    navigate('/login');
  };

  // Toggle New User Form Visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={goBackToLogin}>Go Back to Login</button>
      {message && <div className={isError ? "error" : "success"}>{message}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
                  <button className="send-reset-email-button" onClick={() => handleSendResetEmail(user._id)}>Send Reset Password Email</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Form' : 'New User Form (+)'}
      </button>
      {isFormVisible && (
        <div className="add-user-form">
          <h3>Add New User</h3>
          <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleNewUserChange} />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleNewUserChange} />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleNewUserChange} />
          <select name="role" value={newUser.role} onChange={handleNewUserChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <input type="text" name="username" value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
          <input type="email" name="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <select name="role" value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => handleUpdateUser(editingUser._id)}>Update User</button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
