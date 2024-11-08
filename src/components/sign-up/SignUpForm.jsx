import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./SignUpForm.module.css"; // Use the new CSS file for styling

const SignUpForm = () => {
  return (
    <div className={styles["sign-up-page"]}>
      <div className={styles["sign-up-form"]}>
        <h2>Sign Up</h2>
        <input type="email" placeholder="GMU Email Address" className={styles["input-field"]} />
        <input type="password" placeholder="Password" className={styles["input-field"]} />
        <input type="password" placeholder="Confirm Password" className={styles["input-field"]} />
        <button className={styles["login-button"]}>Sign Up</button>
        
        <p className={styles["footer-text"]}>Already have an account? <Link to="/login" className={styles["link"]}>Login</Link></p>
      </div>
    </div>
  );
};

export default SignUpForm;
