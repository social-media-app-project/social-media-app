import React, { useState } from "react";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import PostImageSlideshow from "../PostImageSlideshow/PostImageSlideshow";
import styles from "./Post.module.css";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import CommentsSection from "./CommentsSection/CommentsSection";
import LikesView from "./LikesView/LikesView";
import picOne from "../../test-data/test-images/landscape1.jpg";
import picTwo from "../../test-data/test-images/landscape2.jpg";
import picThree from "../../test-data/test-images/vertical.jpg";

const Post = (props) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likesExpanded, setLikesExpanded] = useState(false);

  const isOwner = true;
  const { post, handlePostImageClick } = props;
  const images = [picOne, picTwo, picThree];
  const { description, profilePicUrl, user, timestamp, numLikes, numComments } =
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

  return (
    <div className={styles["post-container"]}>
      <GeneralPostContainer isOwner={isOwner} timestamp={timestamp}>
        <div className={styles["post-text"]}>
          <span>{description}</span>
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
          <button className={styles["post-info-button"]}>
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
        {commentsExpanded ? <CommentsSection /> : null}
        {likesExpanded ? <LikesView /> : null}
      </div>
    </div>
  );
};

export default Post;
