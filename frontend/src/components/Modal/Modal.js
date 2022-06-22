import React from "react";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { children, onOverlayClick, onClose } = props;

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onOverlayClick();
  };

  return (
    <>
      <div
        className={styles["transparent-overlay"]}
        onClick={handleOverlayClick}
      >
        <button className={styles["close-button"]} onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
