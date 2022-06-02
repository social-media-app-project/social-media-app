import React from 'react';
import './CommentsSection.css';
import { comments } from '../../../test-data/post-data.js';
import CreateComment from './CreateComment/CreateComment';
import Comment from './Comment/Comment';

const CommentsSection = () => {
    return (
    <div className='comments-section'>
        <CreateComment />
        {comments.comments.map(comment => <Comment comment={comment} />)}
    </div>
    )
};

export default CommentsSection;