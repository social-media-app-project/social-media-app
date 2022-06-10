import TextButton from "../../common/form/TextButton/TextButton";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginPanel.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginPanel() {
  return (
    <div className={styles["login-panel"]}>
      <div className={styles["login-heading-container"]}>
        <h1 className={styles["login-heading"]}>Welcome</h1>
      </div>
      <div className={styles["inputs-container"]}>
        <LoginForm />
        <hr></hr>
        <button className={styles["sign-in-with-google"]}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign In With Google
        </button>
        <div className={styles["password-button-container"]}>
          <TextButton
            text="Forgot Password?"
            classNames={[styles["forgot-password-button"]]}
            type="button"
          />
        </div>
        <div className={styles["create-button-container"]}>
          <TextButton
            text="Create a new account"
            classNames={[styles["create-account-button"]]}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPanel;
