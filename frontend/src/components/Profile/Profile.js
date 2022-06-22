import React from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Post from "../Post/Post";
import { user } from "../../test-data/user-data";
import { posts } from "../../test-data/post-data";
import { AiOutlinePlus } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const [handleImageClick] = useOutletContext();

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
    </div>
  );
};

export default Profile;
