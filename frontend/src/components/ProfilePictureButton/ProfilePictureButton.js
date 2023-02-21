import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePictureButton.module.css";

const ProfilePictureButton = (props) => {
  return (
    <Link to="/">
      <img
        src={props?.imgUrl}
        alt="avatar"
        className={styles["profile-pic-link"]}
      />
    </Link>
  );
};

export default ProfilePictureButton;
