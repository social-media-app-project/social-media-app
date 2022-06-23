import React from "react";
import styles from "./LogoutButton.module.css";
import { AiOutlineLogout } from "react-icons/ai";

const LogoutButton = () => {
  return (
    <button className={styles["logout-button"]}>
      <span>Logout</span>
      <AiOutlineLogout />
    </button>
  );
};

export default LogoutButton;
