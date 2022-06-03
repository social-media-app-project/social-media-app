import React from 'react';
import styles from './LikesView.module.css';
import {likes} from '../../../test-data/post-data.js';
import Like from './Like/Like'

const LikesView = () => {

    return (
    <div className={styles['likes-view']}>
        {
            likes.length<=0? <div>There are no likes</div>:
            likes.likes.map(like =><Like user={like.user} picURL={like.profilePicUrl} />)

        }

    </div>
    )
};

export default LikesView;