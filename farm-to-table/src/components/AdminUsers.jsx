import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // For navigation
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation
  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/show-all-users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data); // Set the users list
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <div className="back-button" onClick={() => navigate("/dashboard")}>
        &larr;
      </div>

      <div className="users-page-title">
        <h1>USER MANAGEMENT</h1>
      </div>
      <p className="user-count">Total Users: {users.length}</p>
      
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
