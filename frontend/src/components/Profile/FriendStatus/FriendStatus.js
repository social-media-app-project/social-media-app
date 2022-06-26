import React from "react";
import UnfriendButton from "./UnfriendButton/UnfriendButton";
import styles from "./FriendStatus.module.css";
import AddFriendButton from "./AddFriendButton/AddFriendButton";
import { AiOutlineCheck } from "react-icons/ai";

const FriendStatus = () => {
  // TODO: logic for determining this
  const isFriendsWithUser = false;
  const friendRequested = false;

  return (
    <div className={styles["friend-status"]}>
      {friendRequested && (
        <>
          <span>Friend Request Sent</span>
          <AiOutlineCheck />
        </>
      )}
      {isFriendsWithUser && <UnfriendButton />}
      {!isFriendsWithUser && !friendRequested && <AddFriendButton />}
    </div>
  );
};

export default FriendStatus;
