import React from 'react';
import styles from './NavBarButton.module.css';
import { NavLink } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

// Temporary settings stub
const NavBarButton = () => (
  <NavLink to="/home">
    <div className={styles['nav-bar-button']}>
      <FaCog/>
      <span>Settings</span>
    </div>
  </NavLink>
);

export default NavBarButton;
