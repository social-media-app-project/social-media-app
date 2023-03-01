import React, { useRef } from "react";
import ProfileNameButton from "../../../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../../../ProfilePictureButton/ProfilePictureButton";
import styles from "./CreateComment.module.css";
import { FaComment } from "react-icons/fa";
import LargeTextInput from "../../../common/form/LargeTextInput/LargeTextInput";
import { handleCreateComment } from "../../../../services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const CreateComment = ({ postID, user }) => {
  const textArea = useRef();
  const queryClient = useQueryClient();

  const mutateComent = useMutation({
    mutationFn: async (message) => {
      const response = await handleCreateComment({ message: message }, postID);
      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["comments", postID] });
      }, 250);
    },
  });

  async function handlePostComment(e) {
    e.preventDefault();
    mutateComent.mutate(textArea.current);
    const val = e.target.querySelector("#textBox");
    val.textContent = "";
    textArea.current = "";
  }

  return (
    <div className={styles["create-comment-container"]}>
      <div className={styles["profile-pic-container"]}>
        <ProfilePictureButton
          height={"40px"}
          imgUrl={
            user?.profilePicUrl ||
            "https://www.svgrepo.com/show/309688/image-alt-text.svg"
          }
        />
      </div>
      <form
        className={styles["form-container"]}
        onSubmit={(e) => {
          handlePostComment(e);
        }}
      >
        <div className={styles["right-section"]}>
          <ProfileNameButton name="my name" />

          <div className={styles["input-container"]}>
            <LargeTextInput
              id="textBox"
              placeholder={"Leave a comment"}
              className={styles["input"]}
              value={textArea.current}
              onChange={(e) => {
                textArea.current = e.target.textContent;
              }}
            />
          </div>
        </div>
        <button type="submit" className={styles["comment-button"]}>
          <FaComment />
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
