import React, { useEffect } from "react";
import styles from "./SignUpPage.module.css";
import SignUpPagePanel from "./SignUpPagePanel/SignUpPagePanel";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("token") != null) {
      navigate("/profile");
    }
  });
  return (
    <div className={styles["signup-page"]}>
      <SignUpPagePanel />
    </div>
  );
};

export default SignUpPage;
