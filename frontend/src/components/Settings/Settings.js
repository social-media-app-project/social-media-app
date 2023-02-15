// import ChangeProfilePicModal from "../ChangeProfilePicModal/ChangeProfilePicModal";
// import LargeTextInput from "../common/form/LargeTextInput/LargeTextInput";
// import ChangeProfilePic from "./ChangeProfilePic/ChangeProfilePic";
// import profilePicTest from "../../test-data/test-images/vertical.jpg";
import React, { useState, useRef } from "react";
import TextButton from "../common/form/TextButton/TextButton";
import styles from "./Settings.module.css";
import { useNavigate } from "react-router-dom";
import {
  checkUsername,
  getUser,
  updateBio,
  updateUsername,
} from "../../services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Settings = (props) => {
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
  const usernameRef = useRef();
  const bioRef = useRef();

  const settingsQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      return response.json();
    },
  });
  if (settingsQuery.isLoading) {
    return <h1>loading...</h1>;
  }

  // const mutateBioQuery = useMutationQuery()

  let queryTimeout;
  const queryUsername = async () => {
    clearTimeout(queryTimeout);
    queryTimeout = setTimeout(async () => {
      try {
        const val = usernameRef.current.value;
        const response = await checkUsername(val);
        if (!response.ok) {
          setIsError(true);
          setErrorMessage("Username is not valid");
        } else {
          setIsError(false);
          setErrorMessage("Username is valid");
        }
      } catch (error) {}
    }, 300);
  };

  return (
    <div className={styles["settings-container"]}>
      <div>
        <h1 className={styles["settings-header"]}>Settings</h1>
      </div>
      <div className={styles["form-container"]}>
        <form className={styles["settings-form"]}>
          <label className={styles["text-input-label"]}>Update Username</label>
          <input
            placeholder={settingsQuery.data.username}
            ref={usernameRef}
            type="text"
            className={
              !isError ? styles["text-input-valid"] : styles["text-input"]
            }
            id={"name"}
            name={"name"}
            style={{ width: props.width }}
            onKeyUp={queryUsername}
            required
          />
          <div
            className={
              !isError ? styles["error-message-valid"] : styles["error-message"]
            }
          >
            {errorMessage}
          </div>
          {!isError && (
            <TextButton
              text="Update Username"
              type="submit"
              classNames={[styles["save-button"]]}
              onClick={async (e) => {
                e.preventDefault();
                await updateUsername(usernameRef.current.value);
                bioRef.current.value = "";
              }}
            />
          )}
          <div style={{ paddingTop: "12px" }}>
            <label className={styles["text-input-label"]}>Update Bio</label>
            <input
              placeholder={settingsQuery.data.bio}
              ref={bioRef}
              type="text"
              className={styles["text-input-normal"]}
              id={"name"}
              name={"name"}
              style={{ width: props.width }}
              required
            ></input>

            <TextButton
              text="Update Bio"
              type="submit"
              classNames={[styles["save-button"]]}
              onClick={async (e) => {
                e.preventDefault();
                await updateBio(bioRef.current.value);
                bioRef.current.value = "";
              }}
            />
          </div>
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
