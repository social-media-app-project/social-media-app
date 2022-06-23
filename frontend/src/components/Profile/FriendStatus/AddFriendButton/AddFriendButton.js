import React from "react";
import styles from "./AddFriendButton.module.css";

const AddFriendButton = () => {
  return (
    <button className={styles["add-friend-button"]}>
      <span>Add Friend</span>
    </button>
  );
};

export default AddFriendButton;
