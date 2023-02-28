import React, { useState, Suspense, lazy, useEffect } from "react";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import styles from "./Post.module.css";
import { HiOutlineThumbUp /*HiThumbUp*/ } from "react-icons/hi";
import LikesView from "./LikesView/LikesView";
import { handleCreateLike } from "../../services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const LazyCommentsSection = lazy(() =>
  import("./CommentsSection/CommentsSection")
);

const Post = ({ post, username, imgUrl }) => {
  const {
    /*profilePicUrl, user,*/ date,
    likes,
    comments,
    message,
    _id,
    author,
  } = post;
  // const { post, handlePostImageClick } = props;
  const isOwner = true;
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likesExpanded, setLikesExpanded] = useState(false);
  const [likesLen, setLikesLen] = useState(likes.length || 0);
  const [CommentsLen, setCommentsLen] = useState(comments.length || 0);

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
  const mutateLike = useMutation({
    mutationFn: async () => {
      const response = await handleCreateLike(_id);
      return response.json();
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      }, 250);
    },
  });

  return (
    <div className={styles["post-container"]}>
      <GeneralPostContainer
        _id={_id}
        isOwner={isOwner}
        timestamp={date}
        username={username || author.username}
        imgUrl={imgUrl || author.profilePicUrl}
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
            {likesLen} likes
          </button>
          <button
            className={styles["post-info-button"]}
            onClick={(e) => {
              e.preventDefault();
              mutateLike.mutate();
            }}
          >
            <HiOutlineThumbUp className={styles["post-info-icon"]} /> Like
          </button>
          <button
            className={styles["post-info-button"]}
            name="comment"
            onClick={toggleComments}
          >
            {CommentsLen} comments
          </button>
        </div>
        {commentsExpanded ? (
          <Suspense fallback={<div>loading......</div>}>
            <LazyCommentsSection postID={_id} setCommentsLen={setCommentsLen} />
          </Suspense>
        ) : null}
        {likesExpanded ? (
          <LikesView postID={_id} setLikesLen={setLikesLen} />
        ) : null}
      </div>
    </div>
  );
};

export default Post;
