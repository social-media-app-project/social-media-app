import React, { useRef } from "react";
import ProfileNameButton from "../../../ProfileNameButton/ProfileNameButton";
import ProfilePictureButton from "../../../ProfilePictureButton/ProfilePictureButton";
import styles from "./CreateComment.module.css";
import { FaComment } from "react-icons/fa";
import LargeTextInput from "../../../common/form/LargeTextInput/LargeTextInput";
import { handleCreateComment } from "../../../../services/postService";
const CreateComment = ({ postID }) => {
  const textArea = useRef();

  async function handlePostComment(e) {
    e.preventDefault();
    try {
      const response = await handleCreateComment(
        { message: textArea.current },
        postID
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      const val = e.target.querySelector("#textBox");
      val.textContent = "";
    }
  }

  return (
    <div className={styles["create-comment-container"]}>
      <div className={styles["profile-pic-container"]}>
        <ProfilePictureButton />
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
