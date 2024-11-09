import React from 'react';
import { useNavigate } from 'react-router-dom';
import editProfileIcon from "../../assets/edit-profile.png";
import postsIcon from "../../assets/posts.png";
import styles from "./settingsBox.module.css";

const SettingsBox = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };

  const handleViewPosts = () => {
    navigate('/view-posts'); 
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsForm}>
        <div className={styles.option} onClick={handleEditProfile}>
          <img src={editProfileIcon} alt="Edit Profile Icon" className={styles.icon} />
          <span className={styles.optionText}>Edit Profile</span>
        </div>
        <div className={styles.option} onClick={handleViewPosts}>
          <img src={postsIcon} alt="View Posts Icon" className={styles.icon} />
          <span className={styles.optionText}>View Your Posts</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsBox;
