import React from "react";
import styles from "./ChangeProfilePic.module.css";
import { ImCamera } from "react-icons/im";

const ChangeProfilePic = (props) => {
  const { handleClick, src } = props;

  return (
    <div className={styles["change-profile-pic"]}>
      <img src={src} alt="person" className={styles["profile-pic"]} />
      <button className={styles["pic-button"]} onClick={handleClick}>
        <ImCamera />
      </button>
    </div>
  );
};

export default ChangeProfilePic;
