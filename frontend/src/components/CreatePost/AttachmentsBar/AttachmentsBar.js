import React from "react";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import styles from "./AttachmentsBar.module.css";

const AttachmentsBar = () => {
  return (
    <div className={styles["attachments-bar"]}>
      <button>
        <ImageUploadButton />
      </button>
    </div>
  );
};

export default AttachmentsBar;
