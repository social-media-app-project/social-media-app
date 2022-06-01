import React from 'react';
import GeneralPostContainer from '../GeneralPostContainer/GeneralPostContainer';
import ImageSlideshow from '../ImageSlideshow/ImageSlideshow';
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
        <div className={styles['slideshow-container']}>
            <ImageSlideshow />
        </div>
    </div>
    )
};

export default Post;