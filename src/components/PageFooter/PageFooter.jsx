import styles from "./PageFooter.module.css"
import masonLogo from "../../assets/mason-logo.png"
import { HashLink as Link } from 'react-router-hash-link';

const scrollOffset = (el) => {
    const offset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({top: y, behavior: "smooth"});
};

function PageFooter() {
    return(
        <div className={styles.footer}>
            <div className={styles.contentContainer}>
                <div className={styles.leftFooter}>
                    <Link smooth to="/#home" scroll={scrollOffset}>
                        <img src={masonLogo} alt="George Mason University Logo" className={styles.gmuLogo} />
                    </Link>
                </div>
                <div className={styles.rightFooter}>
                    <p className={styles.rightFooterHeading}>ALL TOGETHER DIFFERENT</p>
                    <p>George Mason University</p>
                    <p>4400 University Drive, MSN 2FL</p>
                    <p>Fairfax, VA 22030</p>
                    <p>Tel or SMS: +1703-993-2975</p>
                    <p>© 2024 George Mason University</p>
                </div>
            </div>
            <div className={styles.horizontalLine}>
            </div>
            <div className={styles.bottomFooter}>
                <a href="https://www.gmu.edu/sitemap.xml">Contact</a>
                <a href="https://www.gmu.edu/privacy-statement">Privacy Statement</a>
                <a href="https://www.gmu.edu/about/integrity-and-standards/FOIA">FOIA</a>
            </div>
        </div>
    );
}

export default PageFooter