import React, { useState, Suspense, lazy, useEffect } from "react";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import styles from "./Post.module.css";
import { HiOutlineThumbUp /*HiThumbUp*/ } from "react-icons/hi";
import LikesView from "./LikesView/LikesView";
import { handleCreateLike } from "../../services/postService";
const LazyCommentsSection = lazy(() =>
  import("./CommentsSection/CommentsSection")
);

const Post = ({ post, username, imgUrl }) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likesExpanded, setLikesExpanded] = useState(false);

  const isOwner = true;
  // const { post, handlePostImageClick } = props;
  const { /*profilePicUrl, user,*/ date, likes, comments, message, _id } = post;

  const toggleComments = () => {
    if (likesExpanded) {
      setLikesExpanded(false);
    }
    setCommentsExpanded(!commentsExpanded);
  };

  const toggleLikes = () => {
    if (commentsExpanded) {
      setCommentsExpanded(false);
    }
    setLikesExpanded(!likesExpanded);
  };

  async function postLike(e) {
    e.preventDefault();
    try {
      const response = await handleCreateLike(_id);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles["post-container"]}>
      <GeneralPostContainer
        _id={_id}
        isOwner={isOwner}
        timestamp={date}
        username={username}
        imgUrl={imgUrl}
      >
        <div className={styles["post-text"]}>
          <span>{message}</span>
        </div>
      </GeneralPostContainer>
      {/* <div className={styles["slideshow-container"]}>
        <PostImageSlideshow
          images={images}
          handlePostImageClick={handlePostImageClick}
        />
      </div> */}
      <div className={styles["additional-info-container"]}>
        <div className={styles["post-info-container"]}>
          <button
            className={styles["post-info-button"]}
            name="like"
            onClick={toggleLikes}
          >
            {likes.length} likes
          </button>
          <button
            className={styles["post-info-button"]}
            onClick={(e) => postLike(e)}
          >
            <HiOutlineThumbUp className={styles["post-info-icon"]} /> Like
          </button>
          <button
            className={styles["post-info-button"]}
            name="comment"
            onClick={toggleComments}
          >
            {comments.length} comments
          </button>
        </div>
        {commentsExpanded ? (
          <Suspense fallback={<div>loading......</div>}>
            <LazyCommentsSection postID={_id} />
          </Suspense>
        ) : null}
        {likesExpanded ? <LikesView postID={_id} /> : null}
      </div>
    </div>
  );
};

export default Post;
