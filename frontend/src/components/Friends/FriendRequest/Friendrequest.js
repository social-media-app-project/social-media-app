import React from "react";
import styles from "./Friendrequest.module.css";

const FriendRequest = (props) => {
  return (
    <div className={styles["fr"]}>
      <div className={styles["name-pic"]}>
        <img src={props.pic} alt="pic" />
        <div className={styles["names"]}>
          <div>{props.name}</div>
          <div className={styles["username"]}>{props.username}</div>
        </div>
      </div>
      <div className={styles["fr-buttons"]}>
        <button>Accept</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default FriendRequest;
