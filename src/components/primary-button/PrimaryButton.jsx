import PropTypes from "prop-types"

function PrimaryButton(props) {
    return(
        <button>{props.buttonText}</button>
    );
}

PrimaryButton.propTypes = {
    buttonText: PropTypes.string
}

PrimaryButton.defaultProps = {
    buttonText: "Button Text"
}

export default PrimaryButton