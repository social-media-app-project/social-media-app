import React, { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import styles from "./HomeFeed.module.css";
import { posts } from "../../test-data/post-data.js";
import { user } from "../../test-data/user-data.js";
import ImageModal from "../ImageModal/ImageModal";

const HomeFeed = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const handlePostImageClick = (images, index) => {
    changeBodyStyle();
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    setModalOpen(false);
  };

  // Changing the body style is required to prevent scrolling while modal is open
  const changeBodyStyle = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  };

  return (
    <>
      <CreatePost user={user} />
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          handlePostImageClick={handlePostImageClick}
        />
      ))}
      {isModalOpen && (
        <ImageModal
          onOverlayClick={closeModal}
          onClose={closeModal}
          images={modalImages}
          index={modalIndex}
        />
      )}
    </>
  );
};

export default HomeFeed;
