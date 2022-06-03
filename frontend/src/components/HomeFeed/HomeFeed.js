import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import styles from './HomeFeed.module.css';
import { posts } from '../../test-data/post-data.js';
import { user } from '../../test-data/user-data.js';

const HomeFeed = () => {
    return (
    <>
        <CreatePost user={user} />
        {posts.map(post => <Post post={post}/>)}
    </>)
};

export default HomeFeed;