import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import styles from './HomeFeed.module.css';
import { posts, comments, likes } from '../../test-data/post-data.js'

const HomeFeed = () => {
    return (
    <>
        <CreatePost></CreatePost>
        {posts.map(post => <Post post={post}/>)}
    </>)
};

export default HomeFeed;