import { Link } from 'react-router-dom';
import styles from "./NavigationBar.module.css"
import PrimaryButton from '../primary-button/PrimaryButton';
import gmuLogo from "../../assets/gmu-logo.png"
import bellIcon from "../../assets/bell.png"
// Import second bell icon for implementation later
import accountIcon from "../../assets/user.png"

function NavigationBar() {
    return(
        <header className={styles.navBar}>
            {/* 
                Add the GMU logo here in the future with a vertical line 
                splitting the logo and "Lost and found" text
            */}
            <Link to="/" className={styles.brandLogo}>
                <img src={gmuLogo} alt="GMU Logo" className={styles.gmuLogo} />
                <div className={styles.verticalLine}></div>
                <p>LOST AND FOUND</p>
            </Link>

            {/* No class name on this for now */}
            <nav> 
                {/* 
                    TODO: Add state to change the color of the text depending
                    on which page we're on.

                    Example: We're on home page, we want Home to be the GMU gold color (FFC733)
                */}

                {/* Links to other pages */}
                <ul className={styles.navBarList}>
                    <li className={styles.navBarItem}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link to="/forum">Posts</Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link to="/logs">Contact</Link> 
                    </li>
                </ul>
            </nav>

            {/* Right hand side - user/notifications/create post button */}
            <div className={styles.rightItems}>
                <PrimaryButton buttonText="Create Post"/>

                {/* Update the bell icon to the one with indicator if user has notification */}
                {/* Bell image(s) designed by Pixel Perfect (https://icon54.com/) */}
                <a href=""><img src={bellIcon} alt="notification bell" height="40px"/></a>
                <Link to="/login">
                    <div className={styles.accountButton}>
                        <img src={accountIcon} alt="account/user icon" height="40px"/>
                    </div>
                </Link>

                
            </div>

            {/* Search Bar */}
            {/* <div className={styles.navBarSearch}>
            <input
                type="text"
                placeholder="Search with keywords"
                className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
            </div> */}
        </header>
    );
}

export default NavigationBar