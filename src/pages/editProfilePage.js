import React, { useState } from 'react';
import PageHeader from '../components/page-header/PageHeader';
import './css/editProfilePage.css';
import PageFooter from '../components/PageFooter/PageFooter';

const EditProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveChanges = async () => {
    const accountInfo = {
      email,
      password,
    }
    const response = await fetch("http://localhost:3002/account/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(accountInfo),
      credentials: "include"
    })
    if (response.ok){ //TODO: handle successful response

    }
    else{ //TODO: handle server error

    }
    console.log('Changes saved:', { name, email, password });
  };

  return (
    <div className="edit-profile-page">
        <PageHeader pageName="Settings"/>
      <form className="profile-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleSaveChanges} className="save-button">
          Save Changes
        </button>
      </form>
      <PageFooter />
    </div>
  );
};

export default EditProfilePage;
