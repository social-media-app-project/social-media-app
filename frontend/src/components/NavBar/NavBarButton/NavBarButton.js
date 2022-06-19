import React, { useState, useEffect } from "react";
import styles from "./NavBarButton.module.css";
import { NavLink } from "react-router-dom";

// Temporary settings stub
const NavBarButton = (props) => {
  return (
    <NavLink
      to={props.to}
      className={styles["nav-bar-button"]}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? "var(--primary-background)" : undefined,
        };
      }}
    >
      {props.children}
      <span className={styles["nav-button-label"]}>{props.label}</span>
    </NavLink>
  );
};

export default NavBarButton;
