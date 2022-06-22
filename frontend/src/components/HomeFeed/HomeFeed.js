import React, { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import styles from "./HomeFeed.module.css";
import { posts } from "../../test-data/post-data.js";
import { user } from "../../test-data/user-data.js";
import { useOutletContext } from "react-router-dom";

const HomeFeed = () => {
  const [handleImageClick] = useOutletContext();

  return (
    <>
      <CreatePost user={user} />
      {posts.map((post, index) => (
        <Post key={index} post={post} handlePostImageClick={handleImageClick} />
      ))}
    </>
  );
};

export default HomeFeed;
