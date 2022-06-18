import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePictureButton.module.css";
import profilePicTest from "../../test-data/test-images/profilePicTest.jpg";

const ProfilePictureButton = (props) => {
  const { width, height } = props;

  return (
    <Link to="/">
      <img
        src={profilePicTest}
        alt="person"
        className={styles["profile-pic-link"]}
        width={width ? width : undefined}
        height={height ? height : undefined}
      />
    </Link>
  );
};

export default ProfilePictureButton;
