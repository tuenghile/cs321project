// Post.jsx
import React from 'react';
import styles from './logPost.module.css';

const LogPost = ({ itemName, date, location, title, description }) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <h3>{itemName}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.body}>
        <p className={styles.location}>Location: {location}</p>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <button className={styles.contactButton}>Contact</button>
    </div>
  );
};

export default LogPost;
