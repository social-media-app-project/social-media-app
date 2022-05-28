import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post';
import styles from './HomeFeed.module.css';

const HomeFeed = () => {
    const posts = [];

    return (
    <>
        <CreatePost></CreatePost>
        {posts.map(post => <Post></Post>)}
    </>)
};

export default HomeFeed;