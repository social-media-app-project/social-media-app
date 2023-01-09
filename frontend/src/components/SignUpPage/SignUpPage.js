import React from "react";
import styles from "./SignUpPage.module.css";
import SignUpPagePanel from "./SignUpPagePanel/SignUpPagePanel";

const SignUpPage = () => {
  return (
    <div className={styles["signup-page"]}>
      <SignUpPagePanel />
    </div>
  );
};

export default SignUpPage;
