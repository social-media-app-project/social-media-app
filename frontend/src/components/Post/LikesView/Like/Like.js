import React from "react";
import styles from "./Like.module.css";

const Like = ({ username, picURL, userID }) => {
  return (
    <div className={styles["like-holder"]}>
      {/* <img className={styles["like-img"]} src={picURL} alt="profile" /> */}
      {username}
    </div>
  );
};

export default Like;
