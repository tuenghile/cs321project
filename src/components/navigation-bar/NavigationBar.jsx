import styles from "./NavigationBar.module.css"
import gmuLogo from "../../assets/gmu-logo.png"
import { HashLink as Link } from 'react-router-hash-link';
import accountIcon from "../../assets/user.png"
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";

// This is so that we scroll a bit higher than it had before. It was clipping the page heading.
// Can use this for other pages to scroll to top of the page instead of clipping the heading, or offsets for other sections
const homeScrollOffset = (el) => {
    const offset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({top: y, behavior: "smooth"});
};

function NavigationBar() {
    return(
        <header className={styles.navBar}>
            {/* 
                Add the GMU logo here in the future with a vertical line 
                splitting the logo and "Lost and found" text
            */}
            <Link to="/#home" className={styles.brandLogo} scroll={homeScrollOffset}>
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
                        <Link smooth to="/#home" scroll={homeScrollOffset}><p>Home</p></Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link to="/forum"><p>Posts</p></Link>
                    </li>
                    <li className={styles.navBarItem}>
                        {/* added temporarily just to see th UI */}
                        <Link smooth to="/campus-logs"><p>GMU Logs</p></Link> 
                    </li>
                    <li className={styles.navBarItem}>
                        {/* Goes to home page ("/") and scrolls to contact section ("#contact") */}
                        <Link smooth to="/#contact"><p>Contact</p></Link> 
                    </li>
                </ul>
            </nav>

            {/* Right hand side - user/notifications/create post button */}
            <div className={styles.rightItems}>
                {/* Search Bar */}

                <div className={styles.navBarSearch}>
                    <input
                        type="text"
                        placeholder="Search with keywords"
                        className={styles.searchInput}
                    />
                <Link to="/login">
                    <div className={styles.accountButton}>
                        <img src={accountIcon} alt="account/user icon" height="40px"/>

                    </div>
                </Link>

                </div>
            </div>

            <HamburgerMenu></HamburgerMenu>

        </header>
    );
}

export default NavigationBar
