import React from "react";
import DeletePostButton from "../Post/DeletePostButton/DeletePostButton";
import PostDateLabel from "../Post/PostDateLabel/PostDateLabel";
import ProfileNameButton from "../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../ProfilePictureButton/ProfilePictureButton";
import styles from "./GeneralPostContainer.module.css";
import { useParams } from "react-router-dom";
const GeneralPostContainer = (props) => {
  const { timestamp, isOwner, _id } = props;
  const { userId } = useParams();

  return (
    <div className={styles["post-container"]}>
      <div>
        <ProfilePictureButton user={props.user}></ProfilePictureButton>
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["post-header-info"]}>
          <ProfileNameButton name={props.username}></ProfileNameButton>
          {timestamp ? (
            <div>
              <PostDateLabel timestamp={timestamp} />
            </div>
          ) : null}
          {!userId && isOwner ? (
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
