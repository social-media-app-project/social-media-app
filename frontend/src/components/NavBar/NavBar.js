import React from 'react';
import styles from './NavBar.module.css';
import NavBarButton from './NavBarButton/NavBarButton';

const NavBar = () => (
  <div className={styles["nav-bar"]}>
    <NavBarButton/>
  </div>
);

export default NavBar;
