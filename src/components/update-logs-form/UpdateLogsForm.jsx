
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UpdateLogsForm.module.css';

const UpdateLogsForm = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: '',
    location: "Johnson Center",
    status: '',
    description: '',
    image: null,
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setNewPost({ ...newPost, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const itemInfo = {
        title: newPost.title.trim(),
        location: newPost.location.trim(),
        type: "Found", // This isn't really needed for these posts, but setting it to found just to send to db
        date: new Date().toLocaleDateString(),
        image: newPost.image,
        description: newPost.description.trim(),
        status: 'Unclaimed',
        in_inventory: true // Since this is a log post, we're going to mark it as inventory item
      };
      const newItem = await fetch('http://localhost:3002/item/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemInfo),
        credentials: 'include',
      });
      console.log(itemInfo);

      if (newItem.ok) {
        const savedItem = await newItem.json();
        setPosts([...posts, savedItem]);
      } else {
        console.error('Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }

    setNewPost({
      title: '',
      location: '',
      status: '',
      description: '',
      image: null,
    });
  
    navigate('/campus-logs'); // Redirect back to CampusLogs page
  };

  const handleCancel = () => {
    navigate('/campus-logs'); // Redirect back to CampusLogs page on cancel
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={newPost.title}
         onChange={(e) =>
          setNewPost({ ...newPost, title: e.target.value })
        } required
        />
      </label>
      <label>
        Description:
        <textarea value={newPost.description} 
         onChange={(e) =>
          setNewPost({ ...newPost, description: e.target.value })
        } required
         />
      </label>
      <label>
        Status:
        <select value={newPost.status}  onChange={(e) =>
                setNewPost({ ...newPost, status: e.target.value })
              }>
          <option value="Unclaimed">Unclaimed</option>
          <option value="Claimed">Claimed</option>
        </select>
      </label>
      <label>
        Location:
        <select value={newPost.location}  onChange={(e) =>
                setNewPost({ ...newPost, location: e.target.value })
              }>
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
