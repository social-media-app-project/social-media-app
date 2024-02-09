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
        <div className={styles["create-button-container"]}>
          <Link className={styles["create-account-button"]} to="/signup">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPanel;
