import React from "react";
import styles from "./Comment.module.css";
import ProfileNameButton from "../../../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../../../ProfilePictureButton/ProfilePictureButton";
import PostDateLabel from "../../PostDateLabel/PostDateLabel";

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["profile-pic-container"]}>
        <ProfilePictureButton height={"32px"} />
      </div>
      <div className={styles["right-section"]}>
        <div className={styles["comment-header-info"]}>
          <ProfileNameButton name={comment.author.username} />
          <div>
            <PostDateLabel timestamp={comment.date} />
          </div>
        </div>
        <div className={styles["comment"]}>
          <span>{comment.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
