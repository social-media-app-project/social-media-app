import React from "react";
import styles from "./Bio.module.css";

const Bio = (props) => {
  return <div className={styles["bio"]}>{props.bio}</div>;
};

export default Bio;
