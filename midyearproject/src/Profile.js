import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/profile?email=${userEmail}`);
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
      <h2>User Profile</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <p><strong>Full Name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default Profile;
