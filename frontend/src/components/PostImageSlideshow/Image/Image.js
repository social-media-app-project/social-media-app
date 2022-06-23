import React from "react";
import styles from "./Image.module.css";

const Image = (props) => {
  const { index, currIndex, imageSrc, onClick } = props;
  const appearStyle = { display: index === currIndex ? "flex" : "none" };

  return (
    <div className={styles["picture-container"]} style={appearStyle}>
      <img
        className={styles["picture"]}
        src={imageSrc}
        alt="Post"
        onClick={onClick}
      />
    </div>
  );
};

export default Image;
