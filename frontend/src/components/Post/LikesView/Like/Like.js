import React from 'react';
import styles from './Like.module.css';

const Like = ({user,picURL}) => {
    return (
    <div className={styles['like-holder']}>
        <img className={styles['like-img']} src={picURL} alt='profile'/>
        {user}
        
    </div>
    )
};

export default Like;