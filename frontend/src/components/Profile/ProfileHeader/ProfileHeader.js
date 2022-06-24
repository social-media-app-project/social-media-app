import React from "react";
import FriendStatus from "../FriendStatus/FriendStatus";
import styles from "./ProfileHeader.module.css";

const ProfileHeader = (props) => {
  // TODO: something to determine whether user is owner of profile (prop or function)
  const isUser = true;

  const msg = {
    /**TODO: create a settings button which takes user to settings tab */
  };
  return (
    <div className={styles["header-container"]}>
      <div className={styles["not-bio"]}>
        <img src={props.img} alt="header-img" />
        <div className={styles["names"]}>
          <h1 className={styles["name"]}>{props.name}</h1>
          <p>{props.username}</p>
        </div>
      </div>
      <div className={styles["bio"]}>{props.bio}</div>
      {!isUser && (
        <div className={styles["friend-status-container"]}>
          <FriendStatus />
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
