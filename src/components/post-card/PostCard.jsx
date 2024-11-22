import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../post-card/PostCard.module.css";
import tempPostImage from "../../assets/placeholder-img.png";

function PostCard({
  cardTitle = "Post Title",
  location = "GMU Campus",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  reportType = "Lost",
  date = "N/A",
  image,
  status = "Unclaimed",
  userEmail = "email not available",
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Track popup visibility

  // Check if user is logged in
  useEffect(() => {
    fetch("http://localhost:3002/account/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      });
  }, []);

  const handleContactClick = () => {
    setShowPopup(true); // Show popup when contact button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup when the X button is clicked
  };

  return (
    <div className={styles.postCard}>
      <div
        className={styles.reportTypeBar}
        style={{ backgroundColor: reportType === "Lost" ? "#a81d31" : "#FFA500" }}
      />
      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>
          <span>{cardTitle}</span>
        </h3>
        <div className={styles.centerCardSection}>
          <div className={styles.titleAndLocation}>
            <div className={styles.dataContainer}>
              <p className={styles.dataHeading}>Location</p>
              <p className={`${styles.capatalize} ${styles.postText} ${styles.textOutline}`}>{location}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.dataHeading}>Date</p>
              <p className={`${styles.postDate} ${styles.postText} ${styles.textOutline}`}>{date}</p>
            </div>
          </div>

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
          {description && <p className={`${styles.postDescription} ${styles.postText} ${styles.containerOutline}`}>{description}</p>}
        </div>

        {isAuthenticated && (
          <button
            className={styles.contactButton}
            disabled={status === "Claimed"}
            onClick={handleContactClick}
          >
            {status === "Claimed" ? "[CLAIMED]" : "Contact"}
          </button>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              &times;
            </button>
            <p className={styles.popupContent}>{userEmail}</p>
          </div>
        </div>
      )}
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
  status: PropTypes.string,
  userEmail: PropTypes.string,
};

export default PostCard;

