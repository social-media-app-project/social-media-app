import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ msg }) => {
  return <div className={styles["main-container"]}>{msg}</div>;
};

export default ErrorMessage;
