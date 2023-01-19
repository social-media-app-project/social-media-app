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
  const [posts, setPosts] = useState([]);

  const handleImageClick = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const fetchPosts = async () => {
    let token = localStorage.getItem("token");
    try {
      let res = await fetch(`${process.env.REACT_APP_TEST_URL}posts/user/`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      let resPosts = await res.json();
      setPosts(resPosts.posts);
      console.log(resPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated !== true) {
      navigate("/login");
    }
    async function fetchAPI() {
      await fetchPosts();
    }
    fetchAPI();
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
      <button onClick={(e) => fetchPosts(e)}>get posts</button>
    </div>
  );
};

export default Profile;
