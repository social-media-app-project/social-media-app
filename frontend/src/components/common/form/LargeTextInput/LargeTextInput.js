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
        id="textBox"
        className={styles["text-input"]}
        role="textbox"
        spellCheck={false}
        contentEditable
        placeholder={props.placeholder}
        onInput={props.onChange}
      >
        {props.value}
      </div>
    </div>
  );
};

export default LargeTextInput;
