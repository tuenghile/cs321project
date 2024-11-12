// LogPost.jsx
import React from 'react';
import styles from './logPost.module.css';

const LogPost = ({ title, date, location, description, status }) => {
  return (
    <div
      className={`${styles.post} ${status === 'Claimed' ? styles.claimed : styles.unclaimed}`}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.imagePlaceholder}>
        {/* Placeholder for image as shown in your design */}
      </div>
      <div className={styles.body}>
        <p className={styles.location}>Location: {location}</p>
        <p className={styles.status}>Status: {status}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default LogPost;

