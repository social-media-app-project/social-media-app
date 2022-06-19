import React from "react";
import { Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import NavBar from "../NavBar/NavBar";
import styles from "./MainPage.module.css";

const MainPage = () => (
  <div className={styles["main-page"]}>
    <div className={styles["controls-container"]}>
      <NavBar />
      <LogoutButton />
    </div>
    <div className={styles["content-container"]}>
      <Outlet />
    </div>
  </div>
);

export default MainPage;
