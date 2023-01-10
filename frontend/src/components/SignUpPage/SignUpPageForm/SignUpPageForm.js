import React, { useState } from "react";
import styles from "./SignUpPageForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
const SignUpPageForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_2, setPassword_2] = useState("");

  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <form className={styles["signup-form"]}>
      <FormTextInput
        label="Username"
        inputName="user_name"
        value={userName}
        setStateToNewText={setUserName}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Email"
        inputName="email"
        value={email}
        type="email"
        setStateToNewText={setEmail}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Password"
        inputName="password"
        type="password"
        value={password}
        setStateToNewText={setPassword}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Password Confirmation"
        inputName="password_2"
        value={password_2}
        type="password"
        setStateToNewText={setPassword_2}
        handleTextChange={handleTextChange}
      />
      <TextButton
        type="submit"
        text="Submit"
        onClick={(e) => handelSubmit(e)}
        classNames={[styles["signup-button"]]}
      />
    </form>
  );
};

export default SignUpPageForm;
