import React from 'react';

import './profile.css'

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?" alt="User" className="profile-image" />
      <h2>John Doe</h2>
      <p>Email: john.doe@example.com</p>
    </div>
  );
};

export default ProfilePage;
