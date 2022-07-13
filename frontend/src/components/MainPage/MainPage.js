import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles["main-page"]}>
      <div className={styles["content-container"]}>
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default MainPage;
