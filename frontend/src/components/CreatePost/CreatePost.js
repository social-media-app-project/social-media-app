import React, { useState } from "react";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import PostImageSlideshow from "../PostImageSlideshow/PostImageSlideshow";
import AttachmentsBar from "./AttachmentsBar/AttachmentsBar";
import styles from "./CreatePost.module.css";
import CreatePostButton from "./CreatePostButton/CreatePostButton";

const CreatePost = (props) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const fileURLs = [];

    for (let i = 0; i < e.target.files.length; i++) {
      fileURLs.push(URL.createObjectURL(e.target.files[i]));
    }

    setImages([...images, ...fileURLs]);
  };

  const handleRemoveImage = (index) => {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  return (
    <div className={styles["create-post-container"]}>
      <GeneralPostContainer props={props}>
        <LargeTextInput placeholder={"What would you like to say?"} />
      </GeneralPostContainer>
      <div className={styles["slideshow-container"]}>
        <PostImageSlideshow
          images={images}
          handleRemoveImage={handleRemoveImage}
          editable
        />
      </div>
      <div className={styles["buttons-container"]}>
        <AttachmentsBar handleImageUpload={handleImageUpload} />
        <CreatePostButton />
      </div>
    </div>
  );
};

export default CreatePost;
