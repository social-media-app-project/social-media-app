import React from 'react';
import ProfileNameButton from '../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../ProfilePictureButton/ProfilePictureButton';
import AttachmentsBar from './AttachmentsBar/AttachmentsBar';
import styles from './CreatePost.module.css';
import CreatePostButton from './CreatePostButton/CreatePostButton';
import PostTextInput from './PostTextInput/PostTextInput';

const CreatePost = () => {
    return (
    <div className={styles['create-post-container']}>
        <div className={styles['profile-pic-container']}>
            <ProfilePictureButton></ProfilePictureButton>
        </div>
        <div className={styles['create-content-container']}>
            <form>
                <ProfileNameButton name="temp name"></ProfileNameButton>
                <PostTextInput></PostTextInput>
                <div>
                    <AttachmentsBar></AttachmentsBar>
                     <CreatePostButton></CreatePostButton>
                </div>
            </form>
        </div>
    </div>
    )
};

export default CreatePost;