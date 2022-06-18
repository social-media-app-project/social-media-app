import React from "react";
import styles from "./TextButton.module.css";

const TextButton = (props) => (
  <button
    style={props.style}
    className={
      props.classNames
        ? [styles["text-button"], ...props.classNames].join(" ")
        : styles["text-button"]
    }
    type={props.type}
  >
    {props.text}
  </button>
);

export default TextButton;
