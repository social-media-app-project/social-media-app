import React from "react";
import FriendStatus from "../FriendStatus/FriendStatus";
import styles from "./ProfileHeader.module.css";
import { useParams } from "react-router-dom";

const ProfileHeader = (props) => {
  // TODO: something to determine whether user is owner of profile (prop or function)
  const { userId } = useParams();
  const isUser = false;
  const {
    status,
    name = " ",
    username = " ",
    bio = "NO USER",
    img = "https://cdn.nba.com/headshots/nba/latest/1040x760/1626224.png",
  } = props;

  const msg = {
    /**TODO: create a settings button which takes user to settings tab */
  };
  return (
    <div className={styles["header-container"]}>
      <div className={styles["not-bio"]}>
        <img src={img} alt="header-img" />
        <div className={styles["names"]}>
          <h1 className={styles["name"]}>{name}</h1>
          <p>{username}</p>
        </div>
      </div>
      <div className={styles["bio"]}>{bio}</div>
      {userId && (
        <div className={styles["friend-status-container"]}>
          <FriendStatus status={status} friendId={userId} />
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
