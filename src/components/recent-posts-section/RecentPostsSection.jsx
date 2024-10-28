import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primary-button/PrimaryButton';

function RecentPostsSection() {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts'));
        if (savedPosts) {
            // Get the most recent 6 posts
            setRecentPosts(savedPosts.slice(-6).reverse());
        }
    }, []);

    return (
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
            <PrimaryButton buttonText="View all posts"/>
        </Link>
      </section>
    );
}

export default RecentPostsSection