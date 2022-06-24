import React from "react";
import styles from "./LargeTextInput.module.css";

const LargeTextInput = (props) => {
  return (
    <div className={styles["text-input-container"]}>
      <div
        className={styles["text-input"]}
        contentEditable
        role="textbox"
        spellCheck={false}
        placeholder={props.placeholder || "What would you like to say?"}
      />
    </div>
  );
};

export default LargeTextInput;
