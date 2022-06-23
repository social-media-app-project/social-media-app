import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { children, onOverlayClick, onClose } = props;

  // Changing the body style is required to prevent scrolling while modal is open
  const changeBodyStyle = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };

  useEffect(() => {
    changeBodyStyle();
    return closeModal;
  }, []);

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
