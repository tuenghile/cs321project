import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primary-button/PrimaryButton';
import styles from "../recent-posts-section/RecentPostsSection.module.css"
import PostCard from '../post-card/PostCard';

function RecentPostsSection() {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        let recentPosts;
        const getRecent = async () =>{
            try{
                //TODO: parse the json data and display it
                // returns array of json
                recentPosts = await fetch("http://localhost:3002/item/recent");
                if (recentPosts) {
                    // Get the most recent 6 posts
                    setRecentPosts(recentPosts.slice(-6).reverse());
                }
            } catch(error){ //TODO: handle error
            }
        }
        getRecent();
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