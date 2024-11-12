import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./SignUpForm.module.css"; // Use the new CSS file for styling

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Validate email function
  const validateEmail = (email) => {
    const gmuEmailPattern = /^[a-zA-Z0-9._%+-]+@gmu\.edu$/;
    return gmuEmailPattern.test(email);
  };

  // Handle form submission to send verification code
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid @gmu.edu email address.");
      return;
    } else {
      setEmailError("");
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }

    // Send verification code
    try {
      const response = await fetch('http://localhost:3001/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (response.ok) {
        setIsCodeSent(true);
        setVerificationMessage("Verification email sent. Please check your inbox.");
      } else {
        setVerificationMessage(result.message || 'Failed to send verification email.');
      }
    } catch (error) {
      setVerificationMessage("An error occurred. Please try again.1");
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const result = await response.json();
      if (response.ok) {
        setIsVerified(true);
        setVerificationMessage("Email verified successfully!");
        Swal.fire({
          title: "Registered",
          text: "You have signed up successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        var delayInMilliseconds = 5000;
  
        setTimeout(function () {
          //your code to be executed after seconds
          document.location.replace("/login");
        }, delayInMilliseconds);
      } else {
        setVerificationMessage(result.message || 'Invalid verification code.');
      }
    } catch (error) {
      setVerificationMessage("An error occurred. Please try again.2");
    }
  };

  return (
    <div className={styles["sign-up-page"]}>
      <form onSubmit={handleSubmit} className={styles["sign-up-form"]}>
        <h2>Sign Up</h2>
        
        <input
          type="email"
          placeholder="GMU Email Address"
          className={styles["input-field"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className={styles["error-text"]}>{emailError}</p>}
        
        <input
          type="password"
          placeholder="Password"
          className={styles["input-field"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles["input-field"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && <p className={styles["error-text"]}>{passwordError}</p>}

        <button type="submit" className={styles["login-button"]}>Send Verification Code</button>
        
        {/* Display verification code input if code has been sent */}
        {isCodeSent && (
          <>
            <input
              type="text"
              placeholder="Enter Verification Code"
              className={styles["input-field"]}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="button" onClick={handleVerifyCode} className={styles["login-button"]}>
              Verify Code
            </button>
          </>
        )}
        
        {verificationMessage && <p className={styles["info-text"]}>{verificationMessage}</p>}

        <p className={styles["footer-text"]}>
          Already have an account? <Link to="/login" className={styles["link"]}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
