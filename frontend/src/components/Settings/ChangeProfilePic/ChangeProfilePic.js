import React, { useState, useRef } from "react";
import styles from "./ChangeProfilePic.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfilePic } from "../../../services/userService";
const ChangeProfilePic = ({ ppUrl }) => {
  const queryClient = useQueryClient();
  const [avi, setAvi] = useState(ppUrl);
  const rotateRef = useRef(null);
  const scaleRef = useRef(null);
  const eyeRef = useRef(null);
  const skinRef = useRef(null);
  const hairRef = useRef(null);
  const faceshapRef = useRef(null);
  const hairColorRef = useRef(null);

  const previewProfile = () => {
    const rotate = rotateRef.current.value;
    const scale = scaleRef.current.value;
    const eyes = eyeRef.current.value;
    const face = faceshapRef.current.value;
    const hair = hairRef.current.value;
    const skin = skinRef.current.value;
    const hairColor = hairColorRef.current.value;

    const url = new URL("https://api.dicebear.com/5.x/big-ears/svg");
    if (rotate !== "null") {
      url.searchParams.append("rotate", rotate);
    }
    if (scale !== "null") {
      url.searchParams.append("scale", scale);
    }
    if (face !== "null") {
      url.searchParams.append("face", `variant02,${face},variant03`);
    }
    if (eyes !== "null") {
      url.searchParams.append("eyes", `${eyes},variant01,variant02`);
    }
    if (skin !== "null") {
      url.searchParams.append("skinColor", `89532c,${skin},a66637`);
    }
    if (hair !== "null") {
      url.searchParams.append("hair", `long02,${hair},long03`);
    }
    if (hairColor !== "null") {
      let val = `89532c,a66637,${hairColor}`;
      url.searchParams.append("hairColor", val);
    }
    setAvi(url.href);
  };

  const mutateProfile = useMutation({
    mutationFn: async () => {
      const response = await updateProfilePic(avi);
      return await response.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("user");
    },
  });
  const resetCharacter = () => {
    setAvi(ppUrl);
  };

  return (
    <div className={styles["change-profile-pic"]}>
      <label>Update Profile Picture</label>
      <div>
        <img className={styles["img-container"]} alt="avatar" src={avi} />
      </div>
      <div className={styles["pic-form"]}>
        <div className={styles["option-container"]}>
          <label htmlFor="rotate">Rotate: </label>
          <select name="rotate" id="rotate" ref={rotateRef}>
            <option value="0">0&#176; </option>
            <option value="90">90&#176; </option>
            <option value="180">180&#176; </option>
            <option value="270">270&#176; </option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="scale">Scale: </label>
          <select name="scale" id="scale" ref={scaleRef}>
            <option value="100">100%</option>
            <option value="50">50%</option>
            <option value="200">200%</option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="eyes">Eyes: </label>
          <select name="eyes" id="eyes" ref={eyeRef}>
            <option value="null">------</option>
            <option value="variant01">angry</option>
            <option value="variant32">happy</option>
            <option value="variant10">stars</option>
            <option value="variant14">wide</option>
            <option value="variant16">black out</option>
            <option value="variant25">no pupil</option>
            <option value="variant30">button</option>
            <option value="variant09">side eye</option>
            <option value="variant07">unimpressed</option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="face">Face Shape: </label>
          <select name="face" id="face" ref={faceshapRef}>
            <option value="variant04">square</option>
            <option value="variant05">square rounded</option>
            <option value="variant10">oval</option>
            <option value="variant09">long oval</option>
            <option value="variant03">circle</option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="hair">Hair Style: </label>
          <select name="hair" id="hair" ref={hairRef}>
            <option value="null">------</option>
            <option value="long09">long 1</option>
            <option value="long18">long 2</option>
            <option value="short13">short 1</option>
            <option value="short14">short 2</option>
            <option value="short07">curly 1</option>
            <option value="short18">curly 2</option>
            <option value="long05">mouse ears</option>
            <option value="short16">comb over</option>
            <option value="short15">flat top</option>
            <option value="long11">mullet</option>
            <option value="long16">pony tail</option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="hair-color">Hair Color: </label>
          <select name="hair-color" id="hair-color" ref={hairColorRef}>
            <option value="2c1b18">dark brown</option>
            <option value="4a312c">medium brown</option>
            <option value="a55728">light brown</option>
            <option value="c93305">orange</option>
            <option value="d6b370">blond</option>
            <option value="e8e1e1">white</option>
            <option value="f59797">pink</option>
          </select>
        </div>
        <div className={styles["option-container"]}>
          <label htmlFor="skin-color">Skin Color: </label>
          <select name="skin-color" id="skin-color" ref={skinRef}>
            <option value="c07f50">medium</option>
            <option value="89532c">dark</option>
            <option value="f8b788">light</option>
          </select>
        </div>
        <div className={styles["button-container"]}>
          <button
            onClick={(e) => {
              e.preventDefault();
              resetCharacter();
            }}
          >
            Reset
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              previewProfile();
            }}
          >
            Preview
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              mutateProfile.mutate();
            }}
          >
            update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePic;
