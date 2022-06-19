import React from "react";
import DeletePostButton from "../Post/DeletePostButton/DeletePostButton";
import PostDateLabel from "../Post/PostDateLabel/PostDateLabel";
import ProfileNameButton from "../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../ProfilePictureButton/ProfilePictureButton";
import styles from "./GeneralPostContainer.module.css";

const GeneralPostContainer = (props) => {
  const { timestamp, isOwner, handleDelete } = props;

  return (
    <div className={styles["post-container"]}>
      <div>
        <ProfilePictureButton user={props.user}></ProfilePictureButton>
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["post-header-info"]}>
          <ProfileNameButton name="temp name"></ProfileNameButton>
          {timestamp ? (
            <div>
              <PostDateLabel timestamp={timestamp} />
            </div>
          ) : null}
          {isOwner ? (
            <div className={styles["delete-container"]}>
              <DeletePostButton handleDelete={handleDelete} />
            </div>
          ) : null}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default GeneralPostContainer;
