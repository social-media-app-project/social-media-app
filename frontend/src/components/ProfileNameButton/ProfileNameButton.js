import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProfileNameButton.module.css';

const ProfileNameButton = props => {
    return (
    <div className={styles['name-button-container']}>
        <NavLink to="/home" className={styles['name-button']}>
            <span>{props.name}</span>
        </NavLink>
    </div>
    )
};

export default ProfileNameButton;