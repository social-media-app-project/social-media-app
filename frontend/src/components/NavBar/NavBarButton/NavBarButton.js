import React from 'react';
import styles from './NavBarButton.module.css';
import { NavLink } from 'react-router-dom';

// Temporary settings stub
const NavBarButton = props => {
  return (
    <NavLink 
      to={props.to} 
      className={styles['nav-bar-button']} 
      activeClassName={styles['nav-bar-button-active']}>
        {props.children}
        <span className={styles['nav-button-label']}>{props.label}</span>
    </NavLink>
  );
};

export default NavBarButton;
