import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/settingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };

  const handleViewPosts = () => {
    navigate('/view-posts'); 
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-options">
        <div className="option" onClick={handleEditProfile}>
          <i className="icon icon-user" /> {/* Icon for profile */}
          Edit Profile
        </div>
        <div className="option" onClick={handleViewPosts}>
          <i className="icon icon-posts" /> {/* Icon for posts */}
          View Posts
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
