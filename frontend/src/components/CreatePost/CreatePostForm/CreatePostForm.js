import React from "react";
import AttachmentsBar from "../AttachmentsBar/AttachmentsBar";
import CreatePostButton from "../CreatePostButton/CreatePostButton";
import LargeTextInput from "../../common/form/LargeTextInput/LargeTextInput";
import styles from "./CreatePostForm.module.css";

const CreatePostForm = () => {
  return (
    <form>
      <LargeTextInput></LargeTextInput>
      <div className={styles["buttons-container"]}>
        <AttachmentsBar></AttachmentsBar>
        <CreatePostButton></CreatePostButton>
      </div>
    </form>
  );
};

export default CreatePostForm;
