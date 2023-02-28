import React from "react";
import styles from "./Friend.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "../../../services/userService";
import { Link } from "react-router-dom";

const Friend = (props) => {
  const userQuery = useQueryClient();
  const mutateDelete = useMutation({
    mutationFn: async () => {
      const response = await deleteFriend(props._id);
      return response.json();
    },
    onSuccess: () => {
      userQuery.invalidateQueries(["posts", props._id]);
      userQuery.invalidateQueries(["friendspage"]);
    },
  });
  return (
    <div className={styles["fr"]}>
      <Link to={`/${props._id}`} className={styles["name-pic"]}>
        <img src={props.pic} alt="pic" style={{ height: "50px" }} />
        <div className={styles["names"]}>
          <div>{props.name}</div>
          <div className={styles["username"]}>{props.username}</div>
        </div>
      </Link>
      <form className={styles["fr-buttons"]}>
        <button
          onClick={(e) => {
            e.preventDefault();
            mutateDelete.mutate();
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default Friend;
