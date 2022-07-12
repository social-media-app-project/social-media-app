import React, { useState } from "react";
import styles from "./PostImageSlideshow.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "./Image/Image";

const PostImageSlideshow = (props) => {
  const { index, images, handlePostImageClick, editable, handleRemoveImage } =
    props;

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
      {images.length > 1 ? (
        <span>
          {imageIndex + 1} of {images.length}
        </span>
      ) : null}
      <div className={styles["slideshow"]}>
        {images.length > 1 ? (
          <button className={styles["arrow"]} onClick={handleBackClick}>
            <IoIosArrowBack />
          </button>
        ) : null}
        {images.map((imageSrc, index) => {
          return (
            <Image
              handleRemove={handleRemoveImage}
              editable={editable}
              key={index}
              index={index}
              imageSrc={imageSrc}
              currIndex={imageIndex}
              onClick={
                handlePostImageClick
                  ? () => handlePostImageClick(images, index)
                  : undefined
              }
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

export default PostImageSlideshow;
