import React from "react";
import styles from "./ChangeProfilePic.module.css";
import profilePicTest from "../../../test-data/test-images/profilePicTest.jpg";
import { ImCamera } from "react-icons/im";

const ChangeProfilePic = () => {
  // TODO: open image uploading modal on button click

  return (
    <div className={styles["change-profile-pic"]}>
      <img
        src={profilePicTest}
        alt="person"
        className={styles["profile-pic"]}
      />
      <button className={styles["pic-button"]}>
        <ImCamera />
      </button>
    </div>
  );
};

export default ChangeProfilePic;
