import React, { useRef } from "react";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import GeneralPostContainer from "../GeneralPostContainer/GeneralPostContainer";
import styles from "./CreatePost.module.css";
import CreatePostButton from "./CreatePostButton/CreatePostButton";
// import PostImageSlideshow from "../PostImageSlideshow/PostImageSlideshow";
// import AttachmentsBar from "./AttachmentsBar/AttachmentsBar";

const CreatePost = (props) => {
  // const [images, setImages] = useState([]);

  // const handleImageUpload = (e) => {
  //   const fileURLs = [];

  //   for (let i = 0; i < e.target.files.length; i++) {
  //     fileURLs.push(URL.createObjectURL(e.target.files[i]));
  //   }

  //   setImages([...images, ...fileURLs]);
  // };

  // const handleRemoveImage = (index) => {
  //   setImages([
  //     ...images.slice(0, index),
  //     ...images.slice(index + 1, images.length),
  //   ]);
  // };
  const textArea = useRef();
  const handelCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const text = textArea.current;
    try {
      let response = await fetch(`${process.env.REACT_APP_TEST_URL}posts`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: token,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
      let data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        throw new Error("cannot send data");
      }
    } catch (error) {
    } finally {
      let val = e.target.querySelector("#textBox");
      val.textContent = "";
    }
  };

  return (
    <div className={styles["create-post-container"]}>
      <form onSubmit={(event) => handelCreatePost(event)}>
        <GeneralPostContainer props={props}>
          <LargeTextInput
            placeholder={"What would you like to say?"}
            value={textArea.current}
            onChange={(e) => {
              textArea.current = e.target.textContent;
            }}
          />
        </GeneralPostContainer>
        {/* <div className={styles["slideshow-container"]}>
        <PostImageSlideshow
        images={images}
        handleRemoveImage={handleRemoveImage}
        editable
        />
      </div> */}
        <div className={styles["buttons-container"]}>
          {/* <AttachmentsBar handleImageUpload={handleImageUpload} /> */}
          <CreatePostButton />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
