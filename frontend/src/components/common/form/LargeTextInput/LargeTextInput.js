import React from "react";
import styles from "./LargeTextInput.module.css";

const LargeTextInput = (props) => {
  return (
    <div
      className={
        props.classNames
          ? [styles["text-input-container"], ...props.classNames].join(" ")
          : styles["text-input-container"]
      }
    >
      <div
        className={styles["text-input"]}
        contentEditable
        role="textbox"
        spellCheck={false}
        placeholder={props.placeholder}
        onChange={props.onChange}
      >
        {props.value}
      </div>
    </div>
  );
};

export default LargeTextInput;
