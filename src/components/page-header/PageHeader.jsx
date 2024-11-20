import PropTypes from "prop-types"
import styles from "./PageHeader.module.css"

function PageHeader ({pageName = "", pageDescription = ""}) {
    return(
        <div className={styles.pageHeader}>
            <h1>{pageName}</h1>

            {/* Only renders description if string is not empty */}
            {/* Some pages may not have a description, and simply just a page name */}
            {pageDescription && <p>{pageDescription}</p>} 
        </div>
    );
}

// Used for debugging (in console)
// Error appears if not string
PageHeader.propTypes = {
    pageName: PropTypes.string,
    pageDescription: PropTypes.string
}

export default PageHeader