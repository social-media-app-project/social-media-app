import React from "react";
import styles from "./SignInWithPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const SignInWithPanel = () => {
  const facebook = () => {
    window.open("http://localhost:3002/facebook", "_self");
  };
  return (
    <div className={styles["sign-in-with-container"]}>
      <button className={styles["sign-in-with"]}>
        <FontAwesomeIcon className={styles["icon-colour"]} icon={faGoogle} />
        Sign In With Google
      </button>

      <button className={styles["sign-in-with"]} onClick={facebook}>
        <FontAwesomeIcon className={styles["icon-colour"]} icon={faFacebook} />
        Sign In With Facebook
      </button>
    </div>
  );
};

export default SignInWithPanel;
