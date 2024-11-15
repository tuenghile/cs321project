import PropTypes from "prop-types"
import styles from "./PrimaryButton.module.css"

function PrimaryButton(props) {
    return(
        <button className={styles.primaryButton} onClick={props.onClick}>{props.buttonText}</button>
    );
}

PrimaryButton.propTypes = {
    buttonText: PropTypes.string
}

PrimaryButton.defaultProps = {
    buttonText: "Button Text"
}

export default PrimaryButton