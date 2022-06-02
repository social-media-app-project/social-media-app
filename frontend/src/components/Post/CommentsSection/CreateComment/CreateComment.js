import React from 'react';
import ProfileNameButton from '../../../ProfileNameButton/ProfileNameButton';
import ProfilePictureButton from '../../../ProfilePictureButton/ProfilePictureButton';
import './CreateComment.css';
import { FaComment } from 'react-icons/fa';

const CreateComment = () => {
    return (
    <div className='create-comment-container'>
        <div className='profile-pic-container'>
            <ProfilePictureButton />
        </div>
        <div className='right-section'>
            <ProfileNameButton name='my name' />
            <div className='input-container'>
                <div
                    className='input'
                    contentEditable
                    role="textbox"
                    spellCheck={false}
                    placeholder="Comment here" />
            </div>
        </div>
        <button>
            <FaComment />
        </button>
    </div>
    )
};

export default CreateComment;