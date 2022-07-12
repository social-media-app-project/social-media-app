import React, { useRef } from "react";
import styles from "./ImageUploadButton.module.css";

const ImageUploadButton = (props) => {
  const { className, children, handleImageUpload, multiple } = props;

  const imageInputRef = useRef();

  return (
    <div>
      <button
        onClick={() => imageInputRef.current.click()}
        className={className ? className : styles["upload-icon"]}
        type="button"
      >
        {children}
      </button>
      <input
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        multiple={multiple}
        type="file"
        hidden
      />
    </div>
  );
};

export default ImageUploadButton;
