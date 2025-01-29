import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Userlist.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch the users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/members');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setMessage('Error fetching users. Please try again.');
      setIsError(true);
    }
  };

  // Handle input change for new user
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/members', newUser);
      console.log('New user added:', response.data);
      fetchUsers();  // Refresh user list
      setNewUser({ username: '', email: '', role: 'user', password: '' });  // Reset form
      setMessage("New user added successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error adding user:', err);
      setMessage('Error adding user. Please try again.');
      setIsError(true);
    }
  };

  // Update user
  const handleUpdateUser = async (userId) => {
    try {
      const updatedData = {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role,
      };
      await axios.put(`http://localhost:3001/members/${userId}`, updatedData);
      fetchUsers();  // Refresh user list
      setEditingUser(null);  // Clear editing state
      setMessage("User updated successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage('Error updating user. Please try again.');
      setIsError(true);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/members/${userId}`);
      fetchUsers();  // Refresh user list
      setMessage("User deleted successfully!");
      setIsError(false);
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Error deleting user. Please try again.');
      setIsError(true);
    }
  };

  // Go back to login page
  const goBackToLogin = () => {
    navigate('/login');  // Navigate to login page
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {/* Button to go back to login page */}
      <button onClick={goBackToLogin}>Go Back to Login</button>

      {/* Display message */}
      {message && (
        <div className={`message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {/* Table to display users */}
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
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Form */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleNewUserChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleNewUserChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleNewUserChange}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleNewUserChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <input
            type="text"
            name="username"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <select
            name="role"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
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

export default UserList;
