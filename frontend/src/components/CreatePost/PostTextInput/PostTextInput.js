import React from 'react';
import styles from './PostTextInput.module.css';

const PostTextInput = () => {
    return (
    <div className={styles['text-input-container']}>
        <textarea 
            className={styles['text-input']}
            name='post text'
            placeholder='What would you like to share?'
            autoComplete='off'
            required
            spellCheck={false}
            ></textarea>
    </div>
    )
};

export default PostTextInput;