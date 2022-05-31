import React from 'react';
import ProfileNameButton from '../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../ProfilePictureButton/ProfilePictureButton';
import styles from './GeneralPostContainer.module.css';

const GeneralPostContainer = props => {
    return (
    <div className={styles['post-container']}>
        <div>
            <ProfilePictureButton user={props.user}></ProfilePictureButton>
        </div>
        <div className={styles['content-container']}>
            <div>
                <ProfileNameButton name="temp name"></ProfileNameButton>
            </div>
            {props.children}
        </div>
    </div>
    )
};

export default GeneralPostContainer;