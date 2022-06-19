import React from "react";
import styles from "./DeletePostButton.module.css";
import { FaTrashAlt } from "react-icons/fa";

const DeletePostButton = () => {
  return (
    <button className={styles["delete-button"]}>
      <FaTrashAlt />
    </button>
  );
};

export default DeletePostButton;
