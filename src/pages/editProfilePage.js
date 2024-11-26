import React, { useState } from 'react';
import PageHeader from '../components/page-header/PageHeader';
import './css/editProfilePage.css';
import PageFooter from '../components/PageFooter/PageFooter';

const EditProfilePage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSaveChanges = async () => {
    console.log("handleSaveChanges triggered");
    setErrorMessage('');
    setSuccessMessage('');
  
    if (!currentPassword || !newPassword) {
      console.log("Validation failed: Fields are required");
      setErrorMessage("Both fields are required.");
      return;
    }
  
    try {
      const accountInfo = { currentPassword, newPassword };
      console.log("Sending request with:", accountInfo);
      
      const response = await fetch("http://localhost:3002/account/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(accountInfo),
        credentials: "include",
    });
    
    if (response.ok) {
        const data = await response.json();
        console.log("Password updated successfully:", data);
        setSuccessMessage("Password updated successfully.");
    } else {
        const errorData = await response.json();
        console.error("Error updating password:", errorData.message);
        setErrorMessage(errorData.message || "Failed to update the password. Please try again.");
    }
    
    } catch (error) {
      console.error("Error making request:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
    }
  };
  

  return (
    <div className="edit-profile-page">
      <PageHeader pageName="Settings" />
      <form className="profile-form">
        <label>Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSaveChanges}
          className="save-button"
        >
          Save Changes
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
      <PageFooter />
    </div>
  );
};

export default EditProfilePage;
