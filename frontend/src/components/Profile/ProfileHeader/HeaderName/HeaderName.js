import React from "react";
import styles from "./HeaderName.module.css";

const HeaderName = (props) => {
  return <h1 className={styles["name"]}>{props.name}</h1>;
};

export default HeaderName;
