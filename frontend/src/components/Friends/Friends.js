import React, { useState, useEffect } from "react";
import styles from "./Friends.module.css";
import { user } from "../../test-data/users";
import FriendRequest from "./FriendRequest/Friendrequest";
import Friend from "./Friend/Friend";
const Friends = () => {
  const [fr, setFr] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const seeFriendRequests = () => {
    setFr(!fr);
  };

  return (
    <div className={styles["friends-container"]}>
      <h1 className={styles["friends-header"]}>Friends</h1>

      <div onClick={seeFriendRequests} className={styles["f-bar"]}>
        Friend Requests
        <span>{user.length}</span>
      </div>
      <div className={styles["fr-container"]}>
        {fr &&
          user.map((person, index) => {
            return (
              <FriendRequest
                key={index}
                pic={person.profilePicUrl}
                name={person.displayName}
                username={person.username}
              />
            );
          })}
      </div>
      <div className={styles["your-friends"]}>
        <h1>
          Your Friends
          <span>{user.length}</span>
        </h1>
      </div>
      <div className={styles["fr-container"]}>
        {user.map((person, index) => {
          return (
            <Friend
              key={index}
              pic={person.profilePicUrl}
              name={person.displayName}
              username={person.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
