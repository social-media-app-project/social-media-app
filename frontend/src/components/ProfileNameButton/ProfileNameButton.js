import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileNameButton.module.css";

const ProfileNameButton = (props) => {
  if (props.isOwner) {
    return (
      <Link to={`/profile` || "/"} className={styles["name-button"]}>
        <span>{props.name}</span>
      </Link>
    );
  } else {
    return (
      <Link
        to={`/${props?.author?._id}` || "/"}
        className={styles["name-button"]}
      >
        <span>{props.name}</span>
      </Link>
    );
  }
};

export default ProfileNameButton;
