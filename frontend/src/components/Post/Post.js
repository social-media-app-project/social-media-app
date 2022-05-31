import React from 'react';
import GeneralPostContainer from '../GeneralPostContainer/GeneralPostContainer';
import styles from './Post.module.css';

const Post = props => {
    const isOwner = true;
    const { post } = props;
    const { description, profilePicUrl, user, timestamp, numLikes, numComments } = props.post;

    return (
    <div className={styles['post-container']}>
        <GeneralPostContainer isOwner={isOwner} timestamp={timestamp}>
            <div className={styles['post-text']}>
                <span>{description}</span>
            </div>
        </GeneralPostContainer>
    </div>
    )
};

export default Post;