import React from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles["settings-container"]}>
      <h1 className={styles["settings-header"]}>Settings</h1>
      <form>
        <div className={styles["edit-pic-container"]}></div>
        <div className={styles["edit-name-container"]}></div>
        <div className={styles["edit-bio-container"]}></div>
      </form>
    </div>
  );
};

export default Settings;
