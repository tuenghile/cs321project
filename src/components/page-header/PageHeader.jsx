import PropTypes from "prop-types"
import styles from "./PageHeader.module.css"

function PageHeader (props) {
    return(
        <header className={styles.pageHeader}>
            <h1>{props.websiteName}</h1>
            <h2>{props.pageName}</h2>
        </header>
    );
}

PageHeader.propTypes = {
    websiteName: PropTypes.string,
    pageName: PropTypes.string
}

PageHeader.defaultProps = {
    websiteName: "George Mason University",
    pageName: "Page Name"
}

export default PageHeader