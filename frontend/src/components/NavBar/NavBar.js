import React from "react";
import styles from "./NavBar.module.css";
import NavBarButton from "./NavBarButton/NavBarButton";
import { FaHome, FaUserAlt, FaUserFriends } from "react-icons/fa";

const NavBar = () => {
  const buttons = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/profile", label: "Profile", icon: <FaUserAlt /> },
    { to: "/friends", label: "Friends", icon: <FaUserFriends /> },
  ];

  return (
    <div className={styles["nav-bar"]}>
      {buttons.map((buttonInfo, index) => (
        <NavBarButton key={index} to={buttonInfo.to} label={buttonInfo.label}>
          {buttonInfo.icon}
        </NavBarButton>
      ))}
    </div>
  );
};

export default NavBar;
