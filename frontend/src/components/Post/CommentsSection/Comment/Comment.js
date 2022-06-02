import React from 'react';
import './Comment.css';
import ProfileNameButton from '../../../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../../../ProfilePictureButton/ProfilePictureButton';
import PostDateLabel from '../../PostDateLabel/PostDateLabel';

const Comment = props => {
    const { comment } = props;

    return (
    <div className='comment-container'>
        <div className='profile-pic-container'>
            <ProfilePictureButton height={'32px'} />
        </div>
        <div className='right-section'>
            <div className='comment-header-info'>
                <ProfileNameButton name={comment.user} />
                <div>
                    <PostDateLabel timestamp={comment.timestamp} />
                </div>
            </div>
            <div className='comment'>
                <span>{comment.comment}</span>
            </div>
        </div>
    </div>
    )
};

export default Comment;