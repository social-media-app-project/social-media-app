import React from "react";
import DeletePostButton from "../Post/DeletePostButton/DeletePostButton";
import PostDateLabel from "../Post/PostDateLabel/PostDateLabel";
import ProfileNameButton from "../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../ProfilePictureButton/ProfilePictureButton";
import styles from "./GeneralPostContainer.module.css";
const GeneralPostContainer = (props) => {
  const { timestamp, isOwner, _id, username, imgUrl, author } = props;
  return (
    <div className={styles["post-container"]}>
      <div>
        <ProfilePictureButton
          imgUrl={imgUrl || props.props.imgUrl}
        ></ProfilePictureButton>
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["post-header-info"]}>
          <ProfileNameButton
            isOwner={isOwner}
            author={author}
            name={username}
          ></ProfileNameButton>
          {timestamp ? (
            <div>
              <PostDateLabel timestamp={timestamp} />
            </div>
          ) : null}
          {isOwner ? (
            <div className={styles["delete-container"]}>
              <DeletePostButton _id={_id} />
            </div>
          ) : null}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default GeneralPostContainer;
