import styles from "./NavigationBar.module.css";
import gmuLogo from "../../assets/gmu-logo.png";
import { HashLink as Link } from "react-router-hash-link";
import accountIcon from "../../assets/user.png";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Offset for smooth scrolling
const scrollOffset = (el) => {
    const offset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
};

function NavigationBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

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

    // Function to check authentication status
    const checkAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:3002/account/", {
                method: "GET",
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect (() => {
        checkAuthentication();
    })

    // Handle account button click
    const handleAccountClick = async () => {
        await checkAuthentication();
        if (isAuthenticated) {
            if(userEmail === "gmulostandfound@gmail.com"){
             navigate("/admin-settings"); // Admin route
            }
            else{
                navigate("/settings"); // Normal Account route
            }
        } else {
            navigate("/login"); // Failed to authenticate: Go back to login page
        }
    };

    return (
        <header className={styles.navBar}>
            <Link to="/#home" className={styles.brandLogo} scroll={scrollOffset}>
                <img src={gmuLogo} alt="GMU Logo" className={styles.gmuLogo} />
                <div className={styles.verticalLine}></div>
                <p>LOST AND FOUND</p>
            </Link>

            <nav>
                <ul className={styles.navBarList}>
                    <li className={styles.navBarItem}>
                        <Link smooth to="/#home" scroll={scrollOffset}>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link smooth to="/forum/#forum" scroll={scrollOffset}>
                            <p>Posts</p>
                        </Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link smooth to="/campus-logs/#campus-logs" scroll={scrollOffset}>
                            <p>GMU Logs</p>
                        </Link>
                    </li>
                    <li className={styles.navBarItem}>
                        <Link smooth to="/#contact">
                            <p>Contact</p>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={styles.rightItems}>
                <div className={styles.navBarSearch}>
                    <input
                        type="text"
                        placeholder="Search with keywords"
                        className={styles.searchInput}
                    />
                    <div onClick={handleAccountClick} className={styles.accountButton}>
                        <img src={accountIcon} alt="account/user icon" height="40px" />
                    </div>
                </div>
            </div>

            <HamburgerMenu></HamburgerMenu>
        </header>
    );
}

export default NavigationBar;