import React, { useState, useEffect, useContext } from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Post from "../Post/Post";
import { user } from "../../test-data/user-data";
import { AiOutlinePlus } from "react-icons/ai";
import ImageModal from "../ImageModal/ImageModal";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import CreatePost from "../CreatePost/CreatePost";
const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [posts, setPosts] = useState(true);

  const handleImageClick = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const fetchPosts = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    try {
      let res = await fetch(`${process.env.REAC_APP_TEST_URL}`, {
        method: "GET",
        mode: "cors",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      let posts = res.json();
    } catch (error) {}
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
      <CreatePost />
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={v4()}
            post={post}
            handlePostImageClick={handleImageClick}
          />
        ))
      ) : (
        <div className={styles["first-post"]}> create your first post</div>
      )}
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
