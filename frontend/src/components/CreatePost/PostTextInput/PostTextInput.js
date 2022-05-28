import React from 'react';
import styles from './PostTextInput.module.css';

const PostTextInput = () => {
    return (
    <div className={styles['text-input-container']}>
        <textarea className={styles['text-input']}></textarea>
    </div>
    )
};

export default PostTextInput;