import React from 'react';
import styles from './CommentsSection.module.css';
import { comments } from '../../../test-data/post-data.js';
import CreateComment from './CreateComment/CreateComment';
import Comment from './Comment/Comment';

const CommentsSection = () => {
    return (
    <div className={styles['comments-section']}>
        <CreateComment />
        {comments.comments.map((comment, index) => <Comment key={index} comment={comment} />)}
    </div>
    )
};

export default CommentsSection;