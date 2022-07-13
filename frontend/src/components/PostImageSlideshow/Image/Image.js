import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Image.module.css";

const Image = (props) => {
  const { index, currIndex, imageSrc, onClick, editable, handleRemove } = props;
  const appearStyle = { display: index === currIndex ? "flex" : "none" };

  return (
    <div className={styles["picture-container"]} style={appearStyle}>
      {editable && (
        <button
          className={styles["delete-button"]}
          onClick={() => handleRemove(index)}
        >
          <FaTrashAlt />
        </button>
      )}
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
