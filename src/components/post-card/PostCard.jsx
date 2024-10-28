import PropTypes from "prop-types"
import styles from "../post-card/PostCard.module.css"
import tempPostImage from "../../assets/map.png"

function PostCard(props) {
    return(
        <div className={styles.postCard}>
            
            {/* Splits done to allow the horizontal placement of the location, title, and img */}
            <div className={styles.reportTypeBar}></div>
            <div className={styles.topCardSection}>
                <div className={styles.titleAndLocation}>
                    <h3>{props.cardTitle}</h3>
                    <p><strong>Location: </strong> {props.location}</p>
                </div>
                {/* Use the bottom conditional render of image for final production */}
                {/* {props.image && (
                    <img
                        // src={URL.createObjectURL(props.image)}
                        alt={props.title}
                        className={styles.postImage}
                    />
                )} */}

                {/* Use this code for image testing */}
                <img src={tempPostImage} alt="Temporary image" className={styles.postImage}/>
            </div>
            {props.description && <p className={styles.postDescription}>{props.description}</p>}
        </div>
    );
}

PostCard.propTypes = {
    cardTitle: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string
}

PostCard.defaultProps = {
    cardTitle: "Post title",
    location: "GMU Campus",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, explicabo vitae mollitia vel molestiae suscipit, nisi voluptates doloribus ab commodi minus id corporis utasdasdsad cumque delectus perspiciatis porro possimus tempore?",
    title: "Post title"
}

export default PostCard

