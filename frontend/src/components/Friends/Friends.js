import React, { useState, useRef } from "react";
import styles from "./Friends.module.css";
import FriendRequest from "./FriendRequest/Friendrequest";
import Friend from "./Friend/Friend";
import TextButton from "../common/form/TextButton/TextButton";
import SearchResults from "./SearchResults/SearchResults";
import { v4 } from "uuid";
import { searchUsers, getUser } from "../../services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Friends = () => {
  const queryClient = useQueryClient();
  const [frOpen, setFrOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const searchRef = useRef();
  const seeFriendRequests = () => {
    setFrOpen(!frOpen);
    if (frOpen) {
      queryClient.invalidateQueries("user");
    }
  };

  const fetchUsers = async (e) => {
    e.preventDefault();
    try {
      const value = searchRef.current.value;
      if (value === "") {
        throw Error("nothing in search bar");
      }
      const response = await searchUsers(value);
      const data = await response.json();
      if (response.ok) {
        setSearchRes(data);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      return response.json();
    },
    onSuccess: (data) => {},
  });
  if (userQuery.isLoading) {
    return <h1>Loading....</h1>;
  }
  if (userQuery.isError) {
    return <pre>{JSON.stringify(userQuery.error.errors)}</pre>;
  }

  return (
    <div className={styles["friends-container"]}>
      <h1 className={styles["friends-header"]}>Friends</h1>

      <div>
        <form
          className={styles["send-request-container"]}
          onSubmit={(e) => {
            fetchUsers(e);
          }}
        >
          <div className={styles["input-container"]}>
            <input
              ref={searchRef}
              onFocus={() => {
                setShowRes(true);
              }}
              onBlur={() => {
                setShowRes(false);
              }}
              type="text"
              className={styles["send-request-input"]}
              id="req-username"
              name="Request Username Input"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
            />
          </div>
          <TextButton
            text="Search"
            type="submit"
            classNames={[styles["send-button"]]}
            onClick={() => setShowRes(true)}
          />
        </form>
        <SearchResults
          results={searchRes}
          inFocus={showRes}
          user={userQuery.data._id || null}
        />
      </div>

      <div
        onClick={(e) => {
          e.preventDefault();
          seeFriendRequests();
        }}
        className={styles["f-bar"]}
      >
        Friend Requests
        <span>{userQuery.data.incoming_requests.length}</span>
      </div>
      <div className={styles["fr-container"]}>
        {frOpen &&
          userQuery.data.incoming_requests.map((person) => {
            return (
              <FriendRequest
                key={v4()}
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
          <span>{userQuery.data.friends.length}</span>
        </h1>
      </div>
      <div className={styles["fr-container"]}>
        {userQuery.data.friends.map((person) => {
          return (
            <Friend
              key={v4()}
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
