import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
  const { children, onOverlayClick, onClose, fullWindow, title } = props;

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
    <div className={styles["transparent-overlay"]} onClick={onOverlayClick}>
      {fullWindow ? (
        <>
          <button className={styles["close-button"]} onClick={onClose}>
            <AiOutlineClose />
          </button>
          {children}
        </>
      ) : (
        <div
          className={styles["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles["header"]}>
            <h1>{title}</h1>
            <button
              className={styles["close-button-contained"]}
              onClick={onClose}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles["modal-content"]}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Modal;
