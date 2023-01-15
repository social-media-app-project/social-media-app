import React, { useState, useEffect, useContext } from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Post from "../Post/Post";
import { user } from "../../test-data/user-data";
import { posts } from "../../test-data/post-data";
import { AiOutlinePlus } from "react-icons/ai";
import ImageModal from "../ImageModal/ImageModal";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
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

  // Fetch data using route path and params
  return (
    <div className={styles["profile-container"]}>
      <ProfileHeader
        img={user.profilePicUrl}
        name={user.displayName}
        username={user.username}
        bio={user.bio}
      />
      {posts.map((post, index) => (
        <Post key={index} post={post} handlePostImageClick={handleImageClick} />
      ))}
      {/**TODO: create pop up modal */}
      <button className={styles["create-post"]}>
        <AiOutlinePlus />
      </button>
      {isModalOpen && (
        <ImageModal
          onOverlayClick={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          images={modalImages}
          index={modalIndex}
        />
      )}
    </div>
  );
};

export default Profile;
