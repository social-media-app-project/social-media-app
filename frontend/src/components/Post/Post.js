import React from 'react';
import ProfileNameButton from '../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../ProfilePictureButton/ProfilePictureButton';
import styles from './Post.module.css';

const Post = props => {
    const { post, isOwner } = props;
    const { description, profilePicUrl, user, timestamp, numLikes, numComments } = props.post;

    return (
    <div className={styles['post-container']}>
        <div className={styles['profile-pic-container']}>
            <ProfilePictureButton></ProfilePictureButton>
        </div>
        <div className={styles['create-content-container']}>
            <ProfileNameButton name="temp name"></ProfileNameButton>
        </div>
    </div>
    )
};

export default Post;