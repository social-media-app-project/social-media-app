import React, { useState } from "react";
import styles from "./ModalImageSlideshow.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "./Image/Image";

const ModalImageSlideshow = (props) => {
  const { index, images } = props;

  const [imageIndex, setImageIndex] = useState(index || 0);

  const handleBackClick = () => {
    const newImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
    setImageIndex(newImageIndex);
  };

  const handleForwardClick = () => {
    let newImageIndex = (imageIndex + 1) % images.length;
    setImageIndex(newImageIndex);
  };

  return (
    <>
      <div className={styles["slideshow"]}>
        {images.length > 1 ? (
          <button className={styles["arrow"]} onClick={handleBackClick}>
            <IoIosArrowBack />
          </button>
        ) : null}
        {images.map((imageSrc, index) => {
          return (
            <Image
              key={index}
              index={index}
              imageSrc={imageSrc}
              currIndex={imageIndex}
            />
          );
        })}
        {images.length > 1 ? (
          <button className={styles["arrow"]} onClick={handleForwardClick}>
            <IoIosArrowForward />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default ModalImageSlideshow;
