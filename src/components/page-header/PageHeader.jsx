import PropTypes from "prop-types"
import styles from "./PageHeader.module.css"

function PageHeader (props) {
    return(
        <header className={styles.pageHeader}>
            <h1>{props.pageName}</h1>
            <p>{props.pageDescription}</p>
        </header>
    );
}

// Used for debugging (in console)
// Error appears if not string
PageHeader.propTypes = {
    pageName: PropTypes.string,
    pageDescription: PropTypes.string
}

// These are values that the props have if not set
PageHeader.defaultProps = {
    pageName: "Page Name",
    pageDescription: "Page description"
}

export default PageHeader