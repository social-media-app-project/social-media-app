import React, { useState } from "react";
import styles from "./DeletePostButton.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeletePost } from "../../../services/postService";

const DeletePostButton = ({ _id }) => {
  const delClient = useQueryClient();
  const [confirm, setConfirm] = useState(false);

  const toggleDelete = () => {
    setConfirm(!confirm);
  };

  const deleteQuery = useMutation({
    mutationFn: (id) => {
      handleDeletePost(id).then((res) => {
        return res.json();
      });
    },
    onSuccess: async () => {
      setTimeout(() => {
        delClient.invalidateQueries("posts");
      }, 100);
    },
  });
  if (deleteQuery.isLoading) {
    return <div>deleting...</div>;
  }
  async function deletePost(e, id) {
    e.preventDefault();
    deleteQuery.mutate(id);
    toggleDelete();
  }
  return (
    <>
      {!confirm ? (
        <button onClick={toggleDelete} className={styles["delete-button"]}>
          <FaTrashAlt />
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            deletePost(e, _id);
          }}
          className={styles["del-form"]}
        >
          <button onClick={toggleDelete} className={styles["close"]}>
            &#10006;
          </button>
          <button type="submit" className={styles["confirm"]}>
            Confirm Delete Post
          </button>
        </form>
      )}
    </>
  );
};

export default DeletePostButton;
