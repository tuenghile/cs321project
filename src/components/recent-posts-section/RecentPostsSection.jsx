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
            <PostCard />
            <PostCard />
            <PostCard />

            {/* NOTE: Removed bottom 3 for mobile view */}
            
            <PostCard />
            <PostCard />
            <PostCard />

          </div>

          <Link to="/forum" style={{ textDecoration: 'none' }}>
              <PrimaryButton buttonText="View all posts"/>
          </Link>

      </section>
    );
}

export default RecentPostsSection