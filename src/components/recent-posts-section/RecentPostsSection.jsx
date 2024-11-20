import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primary-button/PrimaryButton';
import styles from "../recent-posts-section/RecentPostsSection.module.css"
import PostCard from '../post-card/PostCard';

function RecentPostsSection() {
    const [recentPosts, setRecentPosts] = useState([]);

    // Number of posts to display on page -- depending on mobile/desktop
    const [visiblePosts, setVisiblePosts] = useState(6);

    // Checking page width and setting the right number of posts to display
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 810) {
                setVisiblePosts(3); // Shows 3 posts for mobile and tablet
            } else {
                setVisiblePosts(6); // Shows 6 posts for larger screens
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        const getRecent = async () => {
            try {
                const response = await fetch("http://localhost:3002/item/recent");
                const data = await response.json();
                if (data) {
                    setRecentPosts(data.slice(-6).reverse());
                }
            } catch (error) {
                console.error("Error fetching recent posts:", error);
            }
        };
        getRecent();
    }, []);

    return (
        <section className={styles.recentPosts}>

          <h2>Recent Posts</h2>
          <div className={styles.postsGrid}>
            {/* {console.log(recentPosts)} */}
            {recentPosts.slice(0, visiblePosts).map((post, index) => (
                <PostCard
                    key={index} 
                    cardTitle={post.title}
                    location={post.location}
                    description={post.description}
                    image={post.image}
                    reportType={post.type}
                    date={post.date}
                    postStatus={post.status}
                 />
            ))}
          </div>

          <Link to="/forum" style={{ textDecoration: 'none' }}>
              <PrimaryButton buttonText="View all posts"/>
          </Link>

      </section>
    );
}

export default RecentPostsSection