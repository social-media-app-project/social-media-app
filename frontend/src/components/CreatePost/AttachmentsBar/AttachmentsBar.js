import React from "react";
import { FaImages } from "react-icons/fa";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import styles from "./AttachmentsBar.module.css";

const AttachmentsBar = (props) => {
  const { handleImageUpload } = props;

  return (
    <div className={styles["attachments-bar"]}>
      <ImageUploadButton
        multiple
        className={styles["image-upload-button"]}
        handleImageUpload={handleImageUpload}
      >
        <FaImages />
      </ImageUploadButton>
    </div>
  );
};

export default AttachmentsBar;
