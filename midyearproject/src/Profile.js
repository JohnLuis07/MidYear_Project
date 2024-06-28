import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/profile?email=${userEmail}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
        }
      };

      fetchUserData();
    } else {
      setError('No email provided');
    }
  }, [userEmail]);

  return (
    <div className="profile-container">
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div className="profile-card">
          <div className="profile-left">
            <img src="user-placeholder.png" alt="User" className="profile-image" />
            <h3 className="profile-username">{user.username}</h3>
            <p className="profile-placeholder">Insert your desired text here.</p>
          </div>
          <div className="profile-right">
            <table className="profile-table">
              <tbody>
                <tr>
                  <td><strong>Full Name:</strong></td>
                  <td>{user.fullname}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{user.phone || 'Placeholder Phone'}</td>
                </tr>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{user.mobile || 'Placeholder Mobile'}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{user.address || 'Placeholder Address'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default Profile;
