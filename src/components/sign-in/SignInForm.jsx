import React, { useState } from 'react';
import styles from "./SignInForm.module.css"; 
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate function
  const handleSignInClick = async () => {
    setErrorMessage(""); // Clear any previous error messages
  
    try {
      const accountInfo = { email: email.trim(), password: password.trim() };
  
      const response = await fetch("http://localhost:3002/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountInfo),
        credentials: "include",
      });
  
      console.log("Response:", response);
  
      // Handle JSON responses safely
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
  
        if (data.type.toLowerCase() === "admin") {
          navigate("/admin-settings");
        } else if (data.type.toLowerCase() === "user") {
          navigate("/#home");
        } else {
          setErrorMessage("Unexpected response from the server.");
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
      console.error("Request failed:", error);
      setErrorMessage("Failed to connect to the server. Please try again.");
    }
  };
  
  const handleSignUpClick = () => {
    navigate('/create-account'); // Navigate to CreateAccount page
  };

  return (
    <div className={styles.container}>
      <div className={styles['sign-in-page']}>
        <div className={styles['sign-in-form']}>
          <h2>Login</h2>

          {/* Render error message if it exists */}
          {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

          <input 
            type="email" 
            placeholder="GMU Email Address" 
            className={styles['input-field']} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={styles['input-field']} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className={styles['login-button']} onClick={handleSignInClick}>
            Login
          </button>
   
          <div className={styles['divider']} />
          <p>Don’t have an account?</p>
          <button className={styles['signup-button']} onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;