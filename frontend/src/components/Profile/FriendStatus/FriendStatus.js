import React from "react";
import UnfriendButton from "./UnfriendButton/UnfriendButton";
import styles from "./FriendStatus.module.css";
import AddFriendButton from "./AddFriendButton/AddFriendButton";
import { AiOutlineCheck } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriend,
  deleteFriendRequest,
} from "../../../services/userService";
const FriendStatus = ({ status, friendId }) => {
  // TODO: logic for determining this
  const { isFriend, requestIncoming, requestSent } = status;

  const queryClient = useQueryClient();

  const sendFrMutate = useMutation({
    mutationFn: async ({ id }) => {
      const response = await sendFriendRequest(id);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", friendId] });
      }, 500);
    },
  });
  const acceptFrMutate = useMutation({
    mutationFn: async ({ id }) => {
      const response = await acceptFriendRequest(id);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", friendId] });
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
        queryClient.invalidateQueries({ queryKey: ["posts", friendId] });
      }, 500);
    },
  });
  const deleteFriendMutate = useMutation({
    mutationFn: async ({ id }) => {
      const response = await deleteFriend(id);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["posts", friendId] });
      }, 500);
    },
  });

  return (
    <div className={styles["friend-status"]}>
      {!isFriend && !requestSent && !requestIncoming && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendFrMutate.mutate({ id: friendId });
          }}
        >
          <AddFriendButton />
        </form>
      )}
      {isFriend && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteFriendMutate.mutate({ id: friendId });
          }}
        >
          <UnfriendButton />
        </form>
      )}
      {requestSent && (
        <>
          <span>Friend Request Sent</span>
          <AiOutlineCheck />
        </>
      )}
      {requestIncoming && (
        <div className={styles["fr-buttons"]}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              acceptFrMutate.mutate({ id: friendId });
            }}
          >
            <button className={styles["accept-fr"]}>Accept Request</button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteFrMutate.mutate({ id: friendId });
            }}
          >
            <button className={styles["delete-fr"]}>Delete Request</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FriendStatus;
