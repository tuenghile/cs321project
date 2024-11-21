import styles from "./NavigationBar.module.css"
import gmuLogo from "../../assets/gmu-logo.png"
import { HashLink as Link } from 'react-router-hash-link';
import accountIcon from "../../assets/user.png"
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

// This is so that we scroll a bit higher than it had before. It was clipping the page heading.
// Can use this for other pages to scroll to top of the page instead of clipping the heading, or offsets for other sections
const scrollOffset = (el) => {
    const offset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({top: y, behavior: "smooth"});
};


function NavigationBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in and fetch user email
    useEffect(() => {
        fetch("http://localhost:3002/account/", {
            method: "GET",
            credentials: "include"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    setIsAuthenticated(false);
                    return null;
                }
            })
            .then((data) => {
                if (data) {
                    setIsAuthenticated(true);
                    setUserEmail(data.email); // Save the email for further checks
                }
            })
            .catch((error) => {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false);
            });
    }, []);

    const handleAccountClick = () => {
        if (isAuthenticated) {
            if(userEmail === "gmulostandfound@gmail.com"){
             navigate("/admin-settings"); // Authenticated user route
            }
            else{
                navigate("/settings"); // Admin route
            }
        } else {
            navigate("/login"); // Unauthenticated user route
        }
    };
    return(
        <header className={styles.navBar}>
            {/* 
                Add the GMU logo here in the future with a vertical line 
                splitting the logo and "Lost and found" text
            */}
            <Link to="/#home" className={styles.brandLogo} scroll={scrollOffset}>
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
                        <Link smooth to="/#home" scroll={scrollOffset}><p>Home</p></Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link smooth to="/forum/#forum" scroll={scrollOffset}><p>Posts</p></Link>
                    </li>
                    <li className={styles.navBarItem}>
                        {/* added temporarily just to see th UI */}
                        <Link smooth to="/campus-logs/#campus-logs" scroll={scrollOffset}><p>GMU Logs</p></Link> 
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
                <div onClick={handleAccountClick} className={styles.accountButton}>
                    <img src={accountIcon} alt="account/user icon" height="40px"/>
                </div>
                </div>
            </div>

            <HamburgerMenu></HamburgerMenu>

        </header>
    );
}

export default NavigationBar
