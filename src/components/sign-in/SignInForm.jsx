import React, { useState } from 'react';
import styles from "./SignInForm.module.css"; 
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize navigate function
  const handleSignInClick = async () => { // Navigate to HomePage
    try{
      const accountInfo = {
        email: email,
        password: password
      }
      const response = await fetch("http://localhost:3000/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(accountInfo)
      })
      if (response.ok){
        navigate('/#home');
      }
      else if (response.status === 400){ //TODO: handle missing email or password input

      }
      else if (response.status === 404){ //TODO: handle no account with given email

      }
      else if (response.status === 401){ //TODO: handle incorrect password

      }
      else{
        throw Error();
      }
    }
    catch (error){ //TODO: add a response to error

    }
  };
  const handleSignUpClick = () => {
    navigate('/create-account'); // Navigate to CreateAccount page
  };

  return (
    <div className={styles.container}>
      <div className={styles['sign-in-page']}>
        {/* <header className={styles['page-header']}>Account</header> */}
        <div className={styles['sign-in-form']}>
          <h2>Login</h2>
          <input type="email" placeholder="GMU Email Address" className={styles['input-field']} value = {email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className={styles['input-field']} value = {password} onChange={(e) => setPassword(e.target.value)} />
          <button className={styles['login-button']} onClick={handleSignInClick}>
            Login
          </button>
          <a href="#" className={styles['forgot-password']}>Forgot password?</a>
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

