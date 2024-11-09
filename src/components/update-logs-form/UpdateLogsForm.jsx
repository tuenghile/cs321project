// UpdateLogsForm.jsx
import React, { useState } from 'react';
import styles from './UpdateLogsForm.module.css';

const UpdateLogsForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Unclaimed');
  const [location, setLocation] = useState('Johnson Center');
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Update Logs</h2>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateLogsForm;
