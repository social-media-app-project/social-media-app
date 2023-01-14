import React from "react";
import styles from "./SuccessMessage.module.css";

const SuccessMessage = ({ msg }) => {
  return <div className={styles["success"]}>{msg}</div>;
};

export default SuccessMessage;
