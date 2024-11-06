import React from 'react';
import styles from "./SignInForm.module.css"; 
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {

  const navigate = useNavigate(); // Initialize navigate function

  const handleSignUpClick = () => {
    navigate('/create-account'); // Navigate to CreateAccount page
  };

  return (
    <div className={styles['sign-in-page']}>
      {/* <header className={styles['page-header']}>Account</header> */}
      <div className={styles['sign-in-form']}>
        <h2>Login</h2>
        <input type="email" placeholder="GMU Email Address" className={styles['input-field']} />
        <input type="password" placeholder="Password" className={styles['input-field']} />
        <button className={styles['login-button']}>Login</button>
        <a href="#" className={styles['forgot-password']}>Forgot password?</a>
        <div className={styles['divider']} />
        <p>Don’t have an account?</p>
        <button className={styles['signup-button']} onClick={handleSignUpClick}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;

