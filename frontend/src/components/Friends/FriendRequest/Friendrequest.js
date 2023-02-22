import React from "react";
import styles from "./Friendrequest.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from "../../../services/userService";
const FriendRequest = (props) => {
  const queryClient = useQueryClient();
  const acceptFrMutate = useMutation({
    mutationFn: async ({ id }) => {
      const response = await acceptFriendRequest(id);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", props._id] });
        queryClient.invalidateQueries({ queryKey: ["friendspage"] });
        queryClient.invalidateQueries({ queryKey: ["friendrequests"] });
      }, 500);
    },
  });
  const deleteFrMutate = useMutation({
    mutationFn: async ({ id }) => {
      const response = await deleteFriendRequest(id);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", props._id] });
        queryClient.invalidateQueries({ queryKey: ["friendspage"] });
        queryClient.invalidateQueries({ queryKey: ["friendrequests"] });
      }, 500);
    },
  });
  return (
    <div className={styles["fr"]}>
      <div className={styles["name-pic"]}>
        <img src={props.pic} alt="pic" />
        <div className={styles["names"]}>
          {/* <div>{props.name}</div> */}
          <div className={styles["username"]}>{props.username}</div>
        </div>
      </div>
      <form className={styles["fr-buttons"]}>
        <button
          onClick={(e) => {
            e.preventDefault();
            acceptFrMutate.mutate({ id: props._id });
          }}
        >
          Accept
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteFrMutate.mutate({ id: props._id });
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default FriendRequest;
