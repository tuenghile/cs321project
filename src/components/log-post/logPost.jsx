import React, { useEffect, useState } from "react";
import styles from "./logPost.module.css";

const LogPost = ({ id, title, date, location, description, status: initialStatus }) => {
  const [isAdmin, setIsAdmin] = useState(false); 
  const [status, setStatus] = useState(initialStatus); 
  const [showDropdown, setShowDropdown] = useState(false); 

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

  const handleStatusChange = async (newStatus) => {
    try {
        setStatus(newStatus);

        console.log("Updating status for item ID:", id);

        const response = await fetch(`http://localhost:3002/item/status/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include", // Ensure cookies are sent with the request
        });

        console.log("Server response:", response);

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const updatedItem = await response.json();
        console.log("Status updated successfully:", updatedItem);

        setShowDropdown(false);
    } catch (error) {
        console.error("Error updating status:", error);
        setStatus((prevStatus) => !prevStatus);
    }
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
      <div className={styles.imagePlaceholder}>
      
      </div>
      <div className={styles.body}>
        <p className={styles.location}>Location: {location}</p>
        <p className={styles.status}>Status: {status}</p>
        {description && <p>{description}</p>}

        {/* Show Update Status button only if the user is the admin */}
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


