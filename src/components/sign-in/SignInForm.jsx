import React, { useState } from 'react';
import styles from "./SignInForm.module.css"; 
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();

  const handleSignInClick = async () => {
    setErrorMessage(''); 

    try {
      const accountInfo = { email, password };

      // Debugging: Check what is being sent
      console.log("Attempting login with:", accountInfo);

      const response = await fetch("http://localhost:3002/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(accountInfo),
        credentials: "include"
      });

      // Handle different response statuses
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Redirect based on user type
        if (data.type === "Admin") {
          navigate('/admin-settings');
        } else {
          navigate('/#home');
        }
      } else if (response.status === 400) {
        setErrorMessage("Email or password cannot be empty.");
      } else if (response.status === 404) {
        setErrorMessage("No account found with the provided email.");
      } else if (response.status === 401) {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Failed to connect to the server. Please try again.");
    }
  };

  const handleSignUpClick = () => {
    navigate('/create-account');
  };

  return (
    <div className={styles.container}>
      <div className={styles['sign-in-page']}>
        <div className={styles['sign-in-form']}>
          <h2>Login</h2>

          {/* Display error message */}
          {errorMessage && <p className={styles['error-text']}>{errorMessage}</p>}

          {/* Email input */}
          <input
            type="email"
            placeholder="GMU Email Address"
            className={styles['input-field']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className={styles['input-field']}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login button */}
          <button
            className={styles['login-button']}
            onClick={handleSignInClick}
          >
            Login
          </button>

          <a href="#" className={styles['forgot-password']}>Forgot password?</a>
          <div className={styles['divider']} />
          <p>Don’t have an account?</p>
          <button
            className={styles['signup-button']}
            onClick={handleSignUpClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;