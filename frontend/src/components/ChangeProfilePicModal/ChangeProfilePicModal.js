import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageUploadButton from "../CreatePost/ImageUploadButton/ImageUploadButton";
import Modal from "../Modal/Modal";
import styles from "./ChangeProfilePicModal.module.css";
import TextButton from "../common/form/TextButton/TextButton";

const ChangeProfilePicModal = (props) => {
  const { pic, onOverlayClick, onClose, onChange } = props;

  const [crop, setCrop] = useState();
  const [currPic, setCurrPic] = useState(pic);

  const handleImageUpload = (e) => {
    setCurrPic(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeClick = () => {
    onChange(currPic);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      title={"Change Profile Picture"}
    >
      <div className={styles["change-pic-content"]}>
        <ImageUploadButton
          className={styles["upload-button"]}
          handleImageUpload={handleImageUpload}
        >
          Upload a Picture
        </ImageUploadButton>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={1}
          className={styles["crop-tool"]}
        >
          <img src={currPic} alt={"Candidate Profile"} />
        </ReactCrop>
        <TextButton
          text="Change"
          classNames={[styles["change-button"]]}
          onClick={handleChangeClick}
        />
      </div>
    </Modal>
  );
};

export default ChangeProfilePicModal;
