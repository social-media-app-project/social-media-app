import TextButton from "../../common/form/TextButton/TextButton";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginPanel.module.css";
import React from "react";
import SignInWithPanel from "../SignInWithPanel/SignInWithPanel";
import { Link } from "react-router-dom";
function LoginPanel() {
  return (
    <div className={styles["login-panel"]}>
      <div className={styles["login-heading-container"]}>
        <h1 className={styles["login-heading"]}>Welcome</h1>
      </div>
      <div className={styles["inputs-container"]}>
        <LoginForm />
        <hr></hr>
        <SignInWithPanel />

        <div className={styles["password-button-container"]}>
          <TextButton
            text="Forgot Password?"
            classNames={[styles["forgot-password-button"]]}
            type="button"
          />
        </div>
        <div className={styles["create-button-container"]}>
          <Link to="/signup">
            <TextButton
              text="Create a new account"
              classNames={[styles["create-account-button"]]}
              type="button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPanel;
