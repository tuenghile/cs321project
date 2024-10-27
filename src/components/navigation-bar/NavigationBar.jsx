import { Link } from 'react-router-dom';
import styles from "./NavigationBar.module.css"


function NavigationBar() {
    return(
        <nav className={styles.navBar}>

            {/* Website name and logo */}
            <div className={styles.navBarBrand}>
                {/* 
                    Add the GMU logo here in the future with a vertical line 
                    splitting the logo and "Lost and found" text
                */}
                <Link to="/" className={styles.brandLogo}>Lost & Found</Link>
            </div>

            {/* Links to other pages */}
            <ul className={styles.navBarList}>
            <li className={styles.navBarItem}>
                <Link to="/">Home</Link>
            </li>
            <li className={styles.navBarItem}>
                <Link to="/forum">View Posts</Link>
            </li>
            <li className={styles.navBarItem}>
                <Link to="/logs">Check Logs</Link> 
            </li>
            </ul>

            {/* Search Bar */}
            <div className={styles.navBarSearch}>
            <input
                type="text"
                placeholder="Search with keywords"
                className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
            </div>
      </nav>
    );
}

export default NavigationBar