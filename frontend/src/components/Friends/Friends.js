import React from "react";
import styles from "./Friends.module.css";
import Friend from "./Friend/Friend";

const Friends = () => {
  // Fetch data using route path and params

  return (
    <div className={styles["friends-container"]}>
      <h1 className={styles["friends-header"]}>Friends</h1>
      <Friend />
    </div>
  );
};

export default Friends;
