import React from "react";
import styles from "./SignupPage.module.css";
import SignupPanel from "./SignupPanel/SignupPanel/SignupPanel";

const SignupPage = () => {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <SignupPanel />
      </div>
    </div>
  );
};

export default SignupPage;
