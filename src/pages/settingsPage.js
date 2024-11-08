import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import editProfileIcon from "../assets/edit-profile.png"
import postsIcon from "../assets/posts.png"
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
            {/* Header Section */}
      <PageHeader pageName="Settings"/>
      <div className="settings-options">
        <div className="option" onClick={handleEditProfile}>
          <i className="icon icon-user" /> {/* Icon for profile */}
          <img src={editProfileIcon} alt="User Icon" className="icon" />
          <span className="option-text">Edit Profile</span>
        </div>
        <div className="option" onClick={handleViewPosts}>
          <i className="icon icon-posts" /> {/* Icon for posts */}
          <img src={postsIcon} alt="User Icon" className="icon" />
          <span className="option-text">View Posts</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
