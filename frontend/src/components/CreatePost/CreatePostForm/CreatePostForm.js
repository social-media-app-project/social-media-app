import React from "react";
import AttachmentsBar from "../AttachmentsBar/AttachmentsBar";
import CreatePostButton from "../CreatePostButton/CreatePostButton";
import PostTextInput from "../PostTextInput/PostTextInput";
import styles from "./CreatePostForm.module.css";

const CreatePostForm = () => {
  return (
    <form>
      <PostTextInput></PostTextInput>
      <div className={styles["buttons-container"]}>
        <AttachmentsBar></AttachmentsBar>
        <CreatePostButton></CreatePostButton>
      </div>
    </form>
  );
};

export default CreatePostForm;
