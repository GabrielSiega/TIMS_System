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
  const [isFormVisible, setIsFormVisible] = useState(false);  // New state to control visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
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

  const handleUpdateUser = async (userId) => {
    try {
      const updatedData = {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role,
      };
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

  const goBackToLogin = () => {
    navigate('/login');
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);  // Toggle visibility of the form
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={goBackToLogin}>Go Back to Login</button>
      {message && <div className={`message ${isError ? "error" : "success"}`}>{message}</div>}
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.password}</td>
              <td>
                <button className="edit-button" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Form' : 'New User Form (+)'} {/* Toggle button text */}
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

export default UserList;
