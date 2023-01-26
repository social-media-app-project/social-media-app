import React, { useState, Suspense, lazy, useEffect } from "react";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import styles from "./Post.module.css";
import { HiOutlineThumbUp /*HiThumbUp*/ } from "react-icons/hi";
// import CommentsSection from "./CommentsSection/CommentsSection";
import LikesView from "./LikesView/LikesView";
import { handleCreateLike } from "../../services/postService";
// import picOne from "../../test-data/test-images/landscape1.jpg";
// import picTwo from "../../test-data/test-images/landscape2.jpg";
// import picThree from "../../test-data/test-images/vertical.jpg";
const LazyCommentsSection = lazy(() =>
  import("./CommentsSection/CommentsSection")
);

const Post = (props) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likesExpanded, setLikesExpanded] = useState(false);

  const isOwner = true;
  // const { post, handlePostImageClick } = props;
  // const images = [picOne, picTwo, picThree];
  const { /*profilePicUrl, user,*/ date, numLikes, numComments, message, _id } =
    props.post;

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
      <GeneralPostContainer isOwner={isOwner} timestamp={date}>
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
            {numLikes} likes
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
            {numComments} comments
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
