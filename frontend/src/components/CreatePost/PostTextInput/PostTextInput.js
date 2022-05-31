import React from 'react';
import styles from './PostTextInput.module.css';

const PostTextInput = () => {
    // return (
    // <div className={styles['text-input-container']}>
    //     <textarea 
    //         className={styles['text-input']}
    //         name='post text'
    //         placeholder='What would you like to share?'
    //         autoComplete='off'
    //         spellCheck={false}
    //         ></textarea>
    // </div>
    // )

    return (
    <div className={styles['text-input-container']}>
        <div
            className={styles['text-input']}
            contentEditable
            role="textbox"
            spellCheck={false}
            placeholder="What would you like to say?"
        />
    </div>
    )
};

export default PostTextInput;