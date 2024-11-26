import { useState } from "react"
import Hamburger from "hamburger-react"
import { HashLink as Link } from 'react-router-hash-link';
import styles from "./HamburgerMenu.module.css"
import accountIcon from "../../assets/user.png"

const homeScrollOffset = (el) => {
    const offset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({top: y, behavior: "smooth"});
};

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false);
        console.log("Changing state");
    };

    return (
        <div className={styles.visibility} data-testid="hamburger-menu">
            <Hamburger 
                size = {34}
                toggled = {open}
                toggle = {setOpen}
                color="white"
            />

            {open && 
                <div className={styles.divOpened}>
                    <Hamburger
                        size = {34}
                        toggled = {open}
                        toggle = {setOpen}
                        color="white"
                    />
                    <ul className={styles.navBarList}>
                        <li className={styles.navBarItem}>
                            <Link smooth to="/#home" scroll={homeScrollOffset} onClick={handleClick}>Home</Link>
                        </li>
                        <li className={styles.navBarItem}>
                            <Link to="/forum" onClick={handleClick}>Posts</Link>
                        </li>
                        <li className={styles.navBarItem}>
                            {/* added temporarily just to see th UI */}
                            <Link smooth to="/campus-logs" onClick={handleClick}> GMU Logs</Link> 
                        </li>
                        <li className={styles.navBarItem}>
                            {/* Goes to home page ("/") and scrolls to contact section ("#contact") */}
                            <Link smooth to="/#contact" onClick={handleClick}>Contact</Link> 
                        </li>
                        <Link to="/login" onClick={handleClick}>
                            <div className={styles.accountButton}>
                                <img src={accountIcon} alt="account/user icon" height="40px"/>
                            </div>
                        </Link>
                </ul>
                </div>}
        </div>
    );
}