import React from "react";
import styles from "./SignUpPagePanel.module.css";
import SignUpPageForm from "../SignUpPageForm/SignUpPageForm";
import { Link } from "react-router-dom";

const SignUpPagePanel = () => {
  return (
    <div className={styles["panel-container"]}>
      <h1 className={styles["signup-heading"]}>Sign Up</h1>
      <SignUpPageForm />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignUpPagePanel;
