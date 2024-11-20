import PropTypes from "prop-types"
import styles from "./PrimaryButton.module.css"

function PrimaryButton({buttonText = "Button Text", onClick}) {
    return(
        <button className={styles.primaryButton} onClick={onClick}>{buttonText}</button>
    );
}

PrimaryButton.propTypes = {
    buttonText: PropTypes.string
}

export default PrimaryButton