import React from 'react';
import { useNavigate } from 'react-router-dom';
import createPostIcon from "../../assets/pen.png";
import postsIcon from "../../assets/posts.png";
import styles from "./adminSettings.module.css";

const AdminSetiings = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/update-logs'); 
  };

  const handleViewPosts = () => {
    navigate('/campus-logs'); 
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsForm}>
        <div className={styles.option} onClick={handleEditProfile}>
          <img src={createPostIcon} alt="Create Post Icon" className={styles.icon} />
          <span className={styles.optionText}>Create Log Post</span>
        </div>
        <div className={styles.option} onClick={handleViewPosts}>
          <img src={postsIcon} alt="View Posts Icon" className={styles.icon} />
          <span className={styles.optionText}>Update Posts</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSetiings;
