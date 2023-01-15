import React, { useState, useEffect, useContext } from "react";
import styles from "./Friends.module.css";
import { user } from "../../test-data/users";
import FriendRequest from "./FriendRequest/Friendrequest";
import Friend from "./Friend/Friend";
import TextButton from "../common/form/TextButton/TextButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const Friends = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [frOpen, setFrOpen] = useState(false);
  const [requestText, setRequestText] = useState("");

  const seeFriendRequests = () => {
    setFrOpen(!frOpen);
  };

  useEffect(() => {
    if (auth.isAuthenticated !== true) {
      navigate("/login");
    }
  }, [auth.isAuthenticated]);

  return (
    <div className={styles["friends-container"]}>
      <h1 className={styles["friends-header"]}>Friends</h1>

      <div className={styles["send-request-container"]}>
        <div className={styles["input-container"]}>
          <input
            type="text"
            className={styles["send-request-input"]}
            id="req-username"
            name="Request Username Input"
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
          />
        </div>
        <TextButton
          text="Request"
          type="submit"
          classNames={[styles["send-button"]]}
        />
      </div>

      <div onClick={seeFriendRequests} className={styles["f-bar"]}>
        Friend Requests
        <span>{user.length}</span>
      </div>
      <div className={styles["fr-container"]}>
        {frOpen &&
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
