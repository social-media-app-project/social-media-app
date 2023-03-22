import React from "react";
// import styles from "./ImageModal.module.css";
import Modal from "../Modal/Modal";
import ModalImageSlideshow from "../ModalImageSlideshow/ModalImageSlideshow";

const ImageModal = (props) => {
  const { images, index, onOverlayClick, onClose } = props;

  return (
    <Modal onClose={onClose} onOverlayClick={onOverlayClick} fullWindow>
      <ModalImageSlideshow images={images} index={index} />
    </Modal>
  );
};

export default ImageModal;
