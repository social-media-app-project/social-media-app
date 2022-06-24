import React, { useState } from "react";
import FormTextInput from "../common/form/FormTextInput/FormTextInput";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import styles from "./Settings.module.css";

const Settings = (props) => {
  const [nameText, setNameText] = useState("some name");
  const [bioText, setBioText] = useState("some bio");

  return (
    <div className={styles["settings-container"]}>
      <h1 className={styles["settings-header"]}>Settings</h1>
      <form>
        <div className={styles["edit-pic-container"]}></div>
        <div className={styles["edit-name-container"]}>
          <FormTextInput
            label="Name"
            inputName="Name"
            value={nameText}
            setStateToNewText={setNameText}
            handleTextChange={(e) => setNameText(e.target.value)}
          />
        </div>
        <div className={styles["edit-bio-container"]}>
          <LargeTextInput></LargeTextInput>
        </div>
      </form>
    </div>
  );
};

export default Settings;
