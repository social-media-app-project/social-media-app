import React from "react";
import { FaImages } from "react-icons/fa";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import styles from "./AttachmentsBar.module.css";

const AttachmentsBar = () => {
  return (
    <div className={styles["attachments-bar"]}>
      <ImageUploadButton>
        <FaImages />
      </ImageUploadButton>
    </div>
  );
};

export default AttachmentsBar;
