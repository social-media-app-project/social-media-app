import React, { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import styles from "./HomeFeed.module.css";
import { posts } from "../../test-data/post-data.js";
import { user } from "../../test-data/user-data.js";
import Modal from "../Modal/Modal";

const HomeFeed = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>hello</button>
      <CreatePost user={user} />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {isModalOpen && (
        <Modal
          onOverlayClick={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default HomeFeed;
