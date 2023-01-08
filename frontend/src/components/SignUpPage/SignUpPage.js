import React from "react";
import styles from "./SignUpPage.module.css";
import SignUpPageForm from "./SignUpPageForm/SignUpPageForm";

const SignUpPage = () => {
  return (
    <div className={styles["signup-page"]}>
      <SignUpPageForm />
    </div>
  );
};

export default SignUpPage;
