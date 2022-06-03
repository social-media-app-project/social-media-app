import React from 'react';
import GeneralPostContainer from '../GeneralPostContainer/GeneralPostContainer';
import styles from './CreatePost.module.css';
import CreatePostForm from './CreatePostForm/CreatePostForm';

const CreatePost = props => {
    return (
    <div className={styles['create-post-container']}>
        <GeneralPostContainer props={props} >
            <CreatePostForm />
        </GeneralPostContainer>
    </div>
    )
};

export default CreatePost;