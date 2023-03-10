import React from "react";
import styles from "./SignInWithPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { googleSignIn } from "../../../services/authService";

const SignInWithPanel = () => {
  const fetchGoogleSignin = async () => {
    const response = await googleSignIn();
  };

  return (
    <div className={styles["sign-in-with-container"]}>
      <button
        className={styles["sign-in-with"]}
        onClick={(e) => {
          e.preventDefault();
          fetchGoogleSignin();
        }}
      >
        <FontAwesomeIcon className={styles["icon-colour"]} icon={faGoogle} />
        Sign In With Google
      </button>

      <button className={styles["sign-in-with"]}>
        <FontAwesomeIcon className={styles["icon-colour"]} icon={faFacebook} />
        Sign In With Facebook
      </button>
    </div>
  );
};

export default SignInWithPanel;
