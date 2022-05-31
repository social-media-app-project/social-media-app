import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileNameButton.module.css';

const ProfileNameButton = props => {
    return (
    <Link to="/home" className={styles['name-button']}>
        <span>{props.name}</span>
    </Link>
    )
};

export default ProfileNameButton;