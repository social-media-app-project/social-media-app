import React from 'react';
import styles from './NavBar.module.css';
import NavBarButton from './NavBarButton/NavBarButton';
import { FaCog, FaHome, FaUserAlt } from 'react-icons/fa';

const NavBar = () => {
  const buttons = [
    { to: "/home", label: "Home", icon: <FaHome/> },
    { to: "/home", label: "Profile", icon: <FaUserAlt/> }, // TODO: change route
    { to: "/home", label: "Settings", icon: <FaCog/> } // TODO: change route
  ];

  return (
  <div className={styles["nav-bar"]}>
    { buttons.map(buttonInfo => 
      (<NavBarButton to={buttonInfo.to} label={buttonInfo.label}>{buttonInfo.icon}</NavBarButton>)
      )
    }
  </div>
  )
};

export default NavBar;
