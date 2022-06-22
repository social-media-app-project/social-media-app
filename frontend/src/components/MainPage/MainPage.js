import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import NavBar from "../NavBar/NavBar";
import styles from "./MainPage.module.css";
import ImageModal from "../ImageModal/ImageModal";

const MainPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const handleImageClick = (images, index) => {
    changeBodyStyle();
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    setModalOpen(false);
  };

  // Changing the body style is required to prevent scrolling while modal is open
  const changeBodyStyle = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  };

  return (
    <div className={styles["main-page"]}>
      <div className={styles["controls-container"]}>
        <NavBar />
        <LogoutButton />
      </div>
      <div className={styles["content-container"]}>
        <Outlet context={[handleImageClick]} />
      </div>
      {isModalOpen && (
        <ImageModal
          onOverlayClick={closeModal}
          onClose={closeModal}
          images={modalImages}
          index={modalIndex}
        />
      )}
    </div>
  );
};

export default MainPage;
