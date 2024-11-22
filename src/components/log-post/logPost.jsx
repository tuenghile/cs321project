import React, { useEffect, useState } from "react";
import styles from "./logPost.module.css";

const LogPost = ({ id, title, date, location, description, status: initialStatus, onStatusUpdate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync status state with prop updates
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  // Check if the user is logged in and fetch their email
  useEffect(() => {
    fetch("http://localhost:3002/account/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response as JSON
        }
        return null;
      })
      .then((data) => {
        if (data?.email === "gmulostandfound@gmail.com") {
          setIsAdmin(true); // Set isAdmin to true if the user is the admin
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, []);

  // Function to handle status update
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); // Update the local state

    // Send the updated status to the server
    fetch(`http://localhost:3002/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Status updated successfully.");
          if (onStatusUpdate) onStatusUpdate(); // Notify parent to refresh posts
        } else {
          console.error("Failed to update status.");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });

    // Hide the dropdown after updating
    setShowDropdown(false);
  };

  return (
    <div
      className={`${styles.post} ${
        status === "Claimed" ? styles.claimed : styles.unclaimed
      }`}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.body}>
        <p className={styles.location}>Location: {location}</p>
        <p className={styles.status}>Status: {status}</p>
        {description && <p>{description}</p>}

        {isAdmin && (
          <>
            <button
              className={styles.updateButton}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Update Status
            </button>
            {showDropdown && (
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleStatusChange("Claimed")}
                >
                  Claimed
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleStatusChange("Unclaimed")}
                >
                  Unclaimed
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LogPost;

