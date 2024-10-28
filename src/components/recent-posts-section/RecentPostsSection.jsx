import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primary-button/PrimaryButton';
import styles from "../recent-posts-section/RecentPostsSection.module.css"
import PostCard from '../post-card/PostCard';

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
        <section className={styles.recentPosts}>

          <h2>Recent Posts</h2>

          <div className={styles.postsGrid}>
            {/* Testing post cards in the recent post section */}
            {/* <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard /> */}
            
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className={styles.postCard}
                  style={{
                    borderLeft: `5px solid ${
                      post.reportType === 'Lost' ? '#a81d31' : '#FFA500'
                    }`,
                  }}
                >
                    {/* Code for the post card (make this component) */}
                  <h3>{post.title}</h3>
                  <p><strong>Location:</strong> {post.location}</p>
                  {post.description && <p>{post.description}</p>}
                  {post.image && (
                    <img
                      src={URL.createObjectURL(post.image)}
                      alt={post.title}
                      className={styles.postImage}
                    />
                  )}

                </div>
              ))
            ) : ( // Print this if no posts available
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