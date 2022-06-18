import React from "react";
import styles from "./CreatePostButton.module.css";
import TextButton from "../../common/form/TextButton/TextButton";

const CreatePostButton = () => {
  return (
    <TextButton
      text="Post"
      classNames={[styles["post-button"]]}
      type="submit"
    />
  );
};

export default CreatePostButton;
