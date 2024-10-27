import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './src/components/css/homePage.css'; 
import mapImage from '../assets/map.png';
import PageHeader from '../components/page-header/PageHeader';

const HomePage = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) {
      // Get the most recent 6 posts
      setRecentPosts(savedPosts.slice(-6).reverse());
    }
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <PageHeader websiteName="George Mason University" pageName="LOST AND FOUND" />

      {/* <header className="home-header">
        <h1>George Mason University</h1>
        <h2>LOST AND FOUND</h2>
      </header> */}

      {/* Recent Posts Section */}
      <section className="recent-posts">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className="post-card"
                style={{
                  borderLeft: `5px solid ${
                    post.reportType === 'Lost' ? '#a81d31' : '#FFA500'
                  }`,
                }}
              >
                <h3>{post.title}</h3>
                <p><strong>Location:</strong> {post.location}</p>
                {post.description && <p>{post.description}</p>}
                {post.image && (
                  <img
                    src={URL.createObjectURL(post.image)}
                    alt={post.title}
                    className="post-image"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>
        <Link to="/forum" style={{ textDecoration: 'none' }}>
            <button className="view-all-posts-btn">View All Posts</button>
        </Link>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-box">
          <div className="contact-info">
            <h3>Have Any Questions? Contact Us</h3>
            <p><strong>Phone:</strong> (703)-993-2975</p>
            <p><strong>Email:</strong> property@gmu.edu</p>
            <p><strong>Address:</strong> 4400 University Drive, MSN 2FL, Fairfax, Virginia 22030</p>
          </div>
          <div className="contact-map">
            <img
              src={mapImage}
              alt="GMU Campus Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
