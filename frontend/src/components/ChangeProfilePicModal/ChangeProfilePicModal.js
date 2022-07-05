import React from "react";
import ReactCrop from "react-image-crop";
import Modal from "../Modal/Modal";
import styles from "./ChangeProfilePicModal.module.css";

const ChangeProfilePicModal = (props) => {
  const { pic, onOverlayClick, onClose } = props;

  return (
    <Modal
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      title={"Change Profile Picture"}
    ></Modal>
  );
};

export default ChangeProfilePicModal;
