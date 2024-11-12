// src/components/update-logs-form/UpdateLogsForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UpdateLogsForm.module.css';

const UpdateLogsForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Unclaimed');
  const [location, setLocation] = useState('Johnson Center');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      title,
      description,
      status,
      location,
      date: new Date().toLocaleDateString(),
      photo,
    };

    addPost(newPost);
    navigate('/campus-logs'); // Redirect back to CampusLogs page
  };

  const handleCancel = () => {
    navigate('/campus-logs'); // Redirect back to CampusLogs page on cancel
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Unclaimed">Unclaimed</option>
          <option value="Claimed">Claimed</option>
        </select>
      </label>
      <label>
        Location:
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Johnson Center">Johnson Center</option>
          <option value="Fenwick Library">Fenwick Library</option>
        </select>
      </label>
      <label>
        Upload Photo:
        <input type="file" onChange={handlePhotoUpload} />
      </label>
      <div className={styles.buttonContainer}>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UpdateLogsForm;
