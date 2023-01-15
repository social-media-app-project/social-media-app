import React, { useState, useEffect, useContext } from "react";
import ChangeProfilePicModal from "../ChangeProfilePicModal/ChangeProfilePicModal";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import TextButton from "../common/form/TextButton/TextButton";
import ChangeProfilePic from "./ChangeProfilePic/ChangeProfilePic";
import profilePicTest from "../../test-data/test-images/vertical.jpg";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const Settings = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePicTest);

  const handleChangePicClick = () => {
    setModalOpen(true);
  };

  const [nameText, setNameText] = useState("some name");
  const [bioText, setBioText] = useState("some bio");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (auth.isAuthenticated !== true) {
      navigate("/login");
    }
  }, [auth.isAuthenticated]);

  return (
    <div className={styles["settings-container"]}>
      <div>
        <h1 className={styles["settings-header"]}>Settings</h1>
      </div>
      <div className={styles["form-container"]}>
        <form className={styles["settings-form"]} onSubmit={handleSubmit}>
          <div className={styles["edit-pic-container"]}>
            <ChangeProfilePic
              handleClick={handleChangePicClick}
              src={profilePicture}
            />
          </div>
          <div className={styles["edit-name-container"]}>
            <label className={styles["text-input-label"]}>Name</label>
            <input
              type="text"
              className={styles["text-input"]}
              id={"name"}
              name={"name"}
              value={nameText}
              style={{ width: props.width }}
              onChange={(e) => setNameText(e.target.value)}
            ></input>
          </div>
          <div className={styles["edit-bio-container"]}>
            <label className={styles["text-input-label"]}>Bio</label>
            <LargeTextInput
              classNames={[styles["bio-input"]]}
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
            />
          </div>
          <div className={styles["save-button-container"]}>
            <TextButton
              text="Save"
              type="submit"
              classNames={[styles["save-button"]]}
            />
          </div>
        </form>
      </div>
      <div className={styles["logout-button-container"]}>
        <TextButton text="Logout" classNames={[styles["logout-button"]]} />
      </div>
      {isModalOpen && (
        <ChangeProfilePicModal
          onOverlayClick={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          onChange={(pic) => setProfilePicture(pic)}
          pic={profilePicture}
        />
      )}
    </div>
  );
};

export default Settings;
