import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageUploadButton from "../CreatePost/ImageUploadButton/ImageUploadButton";
import Modal from "../Modal/Modal";
import styles from "./ChangeProfilePicModal.module.css";

const ChangeProfilePicModal = (props) => {
  const { pic, onOverlayClick, onClose } = props;

  const [crop, setCrop] = useState();

  return (
    <Modal
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      title={"Change Profile Picture"}
    >
      <div className={styles["change-pic-content"]}>
        <ImageUploadButton className={styles["upload-button"]}>
          Upload a Picture
        </ImageUploadButton>
        <div className={styles["crop-tool-container"]}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1}
            className={styles["crop-tool"]}
          >
            <img src={pic} alt={"Candidate Profile"} />
          </ReactCrop>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeProfilePicModal;
