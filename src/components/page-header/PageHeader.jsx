import PropTypes from "prop-types"
import styles from "./PageHeader.module.css"

function PageHeader (props) {
    return(
        <div className={styles.pageHeader}>
            <h1>{props.pageName}</h1>

            {/* Only renders description if string is not empty */}
            {/* Some pages may not have a description, and simply just a page name */}
            {props.pageDescription && <p>{props.pageDescription}</p>} 
        </div>
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
    pageDescription: ""
}

export default PageHeader