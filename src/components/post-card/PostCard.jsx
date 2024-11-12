import PropTypes from "prop-types";
import styles from "../post-card/PostCard.module.css";
import tempPostImage from "../../assets/map.png";

function PostCard(props) {
  const { cardTitle, location, description, image, reportType, date } = props;

  return (
    <div className={styles.postCard}>
      {/* Dynamic style for reportTypeBar based on reportType */}
      <div
        className={styles.reportTypeBar}
        style={{ backgroundColor: reportType === 'Lost' ? '#a81d31' : '#FFA500' }}
      ></div>
      <div className={styles.topCardSection}>
        <div className={styles.titleAndLocation}>
          <h3>{cardTitle}</h3>
          <p><strong>Location: </strong> {location}</p>
          {/* Display the date below the location */}
          <p className={styles.postDate}><strong>Date: </strong> {date}</p>
        </div>
        {/* Conditional rendering for image */}
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt={cardTitle}
            className={styles.postImage}
          />
        ) : (
          <img src={tempPostImage} alt="temporary maps icon" className={styles.postImage} />
        )}
      </div>
      {description && <p className={styles.postDescription}>{description}</p>}
    </div>
  );
}

PostCard.propTypes = {
  cardTitle: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  reportType: PropTypes.string,
  date: PropTypes.string, 
};

PostCard.defaultProps = {
  cardTitle: "Post title",
  location: "GMU Campus",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  reportType: "Lost",
  date: new Date().toLocaleDateString(), // Default date, if needed
};

export default PostCard;

