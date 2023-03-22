import React, { useEffect } from "react";
import LoginPanel from "./LoginPanel/LoginPanel";
import styles from "./LoginPage.module.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("token") != null) {
      navigate("/profile");
    }
  });
  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <LoginPanel />
      </div>
    </div>
  );
}

export default LoginPage;
