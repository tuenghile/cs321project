import PropTypes from "prop-types"

function PageHeader (props) {
    return(
        <header>
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