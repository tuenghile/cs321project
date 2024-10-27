import PropTypes from "prop-types"
import styles from "./PrimaryButton.module.css"

function PrimaryButton(props) {
    return(
        <button className={styles.primaryButton}>{props.buttonText}</button>
    );
}

PrimaryButton.propTypes = {
    buttonText: PropTypes.string
}

PrimaryButton.defaultProps = {
    buttonText: "Button Text"
}

export default PrimaryButton