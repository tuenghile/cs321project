import React, { useState, useEffect } from 'react';
import './css/forumPage.css';
import PageFooter from '../components/PageFooter/PageFooter';
import PageHeader from '../components/page-header/PageHeader';
import PostCard from '../components/post-card/PostCard'; 

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    location: '',
    reportType: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    location: '',
    reportType: '',
  });

  const [filter, setFilter] = useState('All');

  // Load posts from localStorage on initial load
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!newPost.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!newPost.location.trim()) {
      newErrors.location = 'Location is required.';
    }
    if (!newPost.reportType.trim()) {
      newErrors.reportType = 'Please select Lost or Found.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPostData = {
      id: posts.length + 1,
      ...newPost,
      date: new Date().toLocaleDateString(),
    };

    setPosts([...posts, newPostData]);
    setNewPost({
      title: '',
      location: '',
      reportType: '',
      description: '',
      image: null,
    });
    setShowForm(false);
    setErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewPost({ ...newPost, image: file });
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === 'All') return true;
    return post.reportType === filter;
  });

  return (
    <div>
       <PageHeader  pageDescription=" Welcome to the campus Lost and Found Forum. Here, you can report items you’ve lost on campus
          or post about items you’ve found."/>
    <div className="forum-page">

      {/* Create Post Button */}
      <div className="create-post">
        <button
          className="create-post-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Create Post
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className={`filter-dropdown ${dropdownOpen ? 'open' : ''}`}>
        <select
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setDropdownOpen(true)}   // Open dropdown
          onBlur={() => setDropdownOpen(false)}    // Close dropdown
        >
          <option value="All">Show All</option>
          <option value="Lost">Show Lost</option>
          <option value="Found">Show Found</option>
        </select>
      </div>

      {/* Post Form */}
      {showForm && (
        <form className="post-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Post Title (Required)"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value })
            }
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

          <input
            type="text"
            placeholder="Location (Required)"
            value={newPost.location}
            onChange={(e) =>
              setNewPost({ ...newPost, location: e.target.value })
            }
          />
          {errors.location && <p className="error-message">{errors.location}</p>}

          <select
            value={newPost.reportType}
            onChange={(e) =>
              setNewPost({ ...newPost, reportType: e.target.value })
            }
          >
            <option value="">Select Report Type (Required)</option>
            <option value="Lost">Report Lost</option>
            <option value="Found">Report Found</option>
          </select>
          {errors.reportType && (
            <p className="error-message">{errors.reportType}</p>
          )}

          <textarea
            placeholder="Post Description (Optional)"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {/* Submit and Cancel Buttons */}
          <button type="submit" className="submit-post-btn">
            Submit Post
          </button>
          <button 
            type="button" 
            className="cancel-post-btn" 
            onClick={() => setShowForm(false)} // Hide form on click
          >
            Cancel
          </button>
        </form>
      )}

      {/* Posts Container */}
      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              cardTitle={post.title}
              location={post.location}
              description={post.description}
              image={post.image}
              reportType={post.reportType}
              date={post.date}
            />
          ))
        ) : (
          <p className="no-posts-message">Currently no posts available</p>
        )}
      </div>
    </div>
    <PageFooter />
    </div>
  );
};

export default ForumPage;