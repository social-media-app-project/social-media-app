import LoginPanel from "./LoginPanel/LoginPanel";
import styles from "./LoginPage.module.css";
import React from "react";

function LoginPage() {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <LoginPanel />
      </div>
    </div>
  );
}

export default LoginPage;
