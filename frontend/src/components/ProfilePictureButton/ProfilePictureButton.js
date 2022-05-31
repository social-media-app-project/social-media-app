import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfilePictureButton.module.css';
import profilePicTest from './profilePicTest.jpg';

const ProfilePictureButton = props => {

    return (
    <Link to='/'>
        <img src={profilePicTest} alt='person' className={styles['profile-pic-link']} />
    </Link>
    )
};

export default ProfilePictureButton;