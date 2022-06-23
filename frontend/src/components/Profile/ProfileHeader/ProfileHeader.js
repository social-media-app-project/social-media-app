import React from "react";
import FriendStatus from "../FriendStatus/FriendStatus";
import Bio from "./Bio/Bio";
import HeaderName from "./HeaderName/HeaderName";
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
          <HeaderName name={props.name} />
          <p>{props.username}</p>
        </div>
      </div>
      <Bio bio={props.bio} />
      {!isUser && (
        <div className={styles["friend-status-container"]}>
          <FriendStatus />
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
