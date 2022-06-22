import React from "react";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { children, onOverlayClick, onClose } = props;

  return (
    <>
      <div className={styles["transparent-overlay"]} onClick={onOverlayClick}>
        <button className={styles["close-button"]} onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
