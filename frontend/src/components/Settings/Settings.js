import React, { useState, useEffect, useContext, useRef } from "react";
import ChangeProfilePicModal from "../ChangeProfilePicModal/ChangeProfilePicModal";
import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
import TextButton from "../common/form/TextButton/TextButton";
import ChangeProfilePic from "./ChangeProfilePic/ChangeProfilePic";
import profilePicTest from "../../test-data/test-images/vertical.jpg";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { checkUsername, updateUsername } from "../../services/userService";

const Settings = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [profilePicture, setProfilePicture] = useState(profilePicTest);
  // const handleChangePicClick = () => {
  //   setModalOpen(true);
  // };

  // const [nameText, setNameText] = useState("some name");
  // const [bioText, setBioText] = useState("some bio");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const username = useRef();

  let queryTimeout;
  const queryUsername = async () => {
    clearTimeout(queryTimeout);
    queryTimeout = setTimeout(async () => {
      const response = await checkUsername(username.current.value);

      if (!response.ok) {
        setIsError(true);
        setErrorMessage("Username is not valid");
      } else {
        setIsError(false);
        setErrorMessage("Username is valid");
      }
    }, 300);
  };

  useEffect(() => {
    username.current.value = "bawa";
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
        <form className={styles["settings-form"]}>
          {/* <div className={styles["edit-pic-container"]}>
            <ChangeProfilePic
              handleClick={handleChangePicClick}
              src={profilePicture}
            />
          </div>
          <div className={styles["edit-name-container"]}>
            <label className={styles["text-input-label"]}>Name</label>
            <input
              ref={username}
              type="text"
              className={styles["text-input"]}
              id={"name"}
              name={"name"}
              // value={nameText}
              style={{ width: props.width }}
              // onChange={(e) => setNameText(e.target.value)}
              onKeyUp={queryUsername}
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
          </div>
        </form>
        <form> */}
          <label className={styles["text-input-label"]}>username</label>
          <input
            ref={username}
            type="text"
            className={
              !isError ? styles["text-input-valid"] : styles["text-input"]
            }
            id={"name"}
            name={"name"}
            style={{ width: props.width }}
            onKeyUp={queryUsername}
            required
          ></input>
          <div
            className={
              !isError ? styles["error-message-valid"] : styles["error-message"]
            }
          >
            {errorMessage}
          </div>
          {!isError && (
            <TextButton
              text="Save"
              type="submit"
              classNames={[styles["save-button"]]}
              onClick={async (e) => {
                e.preventDefault();
                await updateUsername(username.current.value);
              }}
            />
          )}
        </form>
      </div>
      <div className={styles["logout-button-container"]}>
        <TextButton text="Logout" classNames={[styles["logout-button"]]} />
      </div>
      {/* {isModalOpen && (
        <ChangeProfilePicModal
          onOverlayClick={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
          onChange={(pic) => setProfilePicture(pic)}
          pic={profilePicture}
        />
      )} */}
    </div>
  );
};

export default Settings;
