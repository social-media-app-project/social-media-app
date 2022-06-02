import React from 'react';
import ProfileNameButton from '../../../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../../../ProfilePictureButton/ProfilePictureButton';
import styles from './CreateComment.module.css';
import { FaComment } from 'react-icons/fa';

const CreateComment = () => {
    return (
    <div className={styles['create-comment-container']}>
        <div className={styles['profile-pic-container']}>
            <ProfilePictureButton />
        </div>
        <div className={styles['right-section']}>
            <ProfileNameButton name='my name' />
            <div className={styles['input-container']}>
                <div
                    className={styles['input']}
                    contentEditable
                    role="textbox"
                    spellCheck={false}
                    placeholder="Comment here" />
            </div>
        </div>
        <button>
            <FaComment />
        </button>
    </div>
    )
};

export default CreateComment;