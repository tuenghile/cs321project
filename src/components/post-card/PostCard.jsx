import PropTypes from "prop-types";
import styles from "../post-card/PostCard.module.css";
import tempPostImage from "../../assets/map.png";
import PrimaryButton from "../primary-button/PrimaryButton";

function PostCard(
  {
    cardTitle = "Post Title", 
    location = "GMU Campus", 
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    reportType = 'Lost',
    date = "N/A",
    image,
    status = "Unclaimed"
  }
) {

  return (
    <div className={styles.postCard}>
      {/* Dynamic style for reportTypeBar based on reportType */}
      <div
        className={styles.reportTypeBar}
        style={{ backgroundColor: reportType === 'Lost' ? '#a81d31' : '#FFA500' }}
      />
      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>
          <span>{cardTitle}</span>
        </h3>
        <div className={styles.centerCardSection}>
          <div className={styles.titleAndLocation}>
            <div className={styles.dataContainer}>
              <p className={styles.dataHeading}>Location</p>
              <p className={styles.capatalize}>{location}</p>
            </div>
            <div className={styles.dataContainer}>
              {/* Display the date below the location */}
              <p className={styles.dataHeading}>Date</p>
              <p className={styles.postDate}>{date}</p>
            </div>
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
        <div className={styles.descriptionContainer}>
          <p className={styles.dataHeading}>Description</p>
          {description && <p className={styles.postDescription}>{description}</p>}
        </div>
        <button className={styles.contactButton} disabled={status === "Claimed"}>
          {status === "Claimed" ? "[CLAIMED]" : "Contact"}
        </button>

      </div>
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
  status: PropTypes.string
};

export default PostCard;

