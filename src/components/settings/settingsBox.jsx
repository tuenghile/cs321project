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


  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");
      const response = await fetch("http://localhost:3002/account/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        window.location.href = "/login";
      } else {
        console.error("Failed to logout:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsBox;
