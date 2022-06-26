import React from "react";
import styles from "./UnfriendButton.module.css";
import { FiDelete } from "react-icons/fi";

const UnfriendButton = () => {
  return (
    <button className={styles["unfriend-button"]}>
      <span>Unfriend</span>
      <FiDelete />
    </button>
  );
};

export default UnfriendButton;
