import React, { useState, useContext, useEffect } from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import styles from "./HomeFeed.module.css";
import { posts } from "../../test-data/post-data.js";
import { user } from "../../test-data/user-data.js";
import ImageModal from "../ImageModal/ImageModal";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const HomeFeed = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const handleImageClick = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    if (auth.isAuthenticated !== true) {
      navigate("/login");
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <CreatePost user={user} />
      {posts.map((post, index) => (
        <Post key={index} post={post} handlePostImageClick={handleImageClick} />
      ))}
      {isModalOpen && (
        <ImageModal
          onOverlayClick={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          images={modalImages}
          index={modalIndex}
        />
      )}
    </>
  );
};

export default HomeFeed;
