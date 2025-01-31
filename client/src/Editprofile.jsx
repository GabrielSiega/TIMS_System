import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtering
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all'); // New state for role filtering
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();

    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/members');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filteredUsers with all users
    } catch (err) {
      console.error('Error fetching users:', err);
      setMessage('Error fetching users. Please try again.');
      setIsError(true);
    }
  };

  // Function to filter users based on selected role
  useEffect(() => {
    if (roleFilter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === roleFilter));
    }
  }, [roleFilter, users]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3001/members/${userId}`);
      fetchUsers();
      setMessage("User deleted successfully!");
      setIsError(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Error deleting user. Please try again.');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000);
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
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage('Error updating user. Please try again.');
      setIsError(true);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="user-list-container">
      <h2>Edit Account Info</h2>
      <button onClick={() => navigate('/Dashboard')}>Go Back to Dashboard</button>

      {/* <div className="user-token">
        <p><strong>User Token:</strong> {userToken || "No token found"}</p>
      </div> */}

      {/* Role Filter Dropdown */}
      <div className="filter-container">
        <label>Filter by Role: </label>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
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
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
