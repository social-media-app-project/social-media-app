import React, { useState } from "react";
import FormTextInput from "../common/form/FormTextInput/FormTextInput";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import TextButton from "../common/form/TextButton/TextButton";
import ChangeProfilePic from "./ChangeProfilePic/ChangeProfilePic";
import styles from "./Settings.module.css";

const Settings = (props) => {
  const [nameText, setNameText] = useState("some name");
  const [bioText, setBioText] = useState("some bio");

  return (
    <div className={styles["settings-container"]}>
      <div>
        <h1 className={styles["settings-header"]}>Settings</h1>
      </div>
      <div className={styles["form-container"]}>
        <form className={styles["settings-form"]}>
          <div className={styles["edit-pic-container"]}>
            <ChangeProfilePic />
          </div>
          <div className={styles["edit-name-container"]}>
            <label className={styles["text-input-label"]}>Name</label>
            <input
              type="text"
              className={styles["text-input"]}
              id={"name"}
              name={"name"}
              value={nameText}
              style={{ width: props.width }}
              onChange={(e) => setNameText(e.target.value)}
            ></input>
          </div>
          <div className={styles["edit-bio-container"]}>
            <label className={styles["text-input-label"]}>Bio</label>
            <LargeTextInput
              classNames={[styles["bio-input"]]}
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
            />
          </div>
          <div className={styles["save-button-container"]}>
            <TextButton
              text="Save"
              type="submit"
              classNames={[styles["save-button"]]}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;