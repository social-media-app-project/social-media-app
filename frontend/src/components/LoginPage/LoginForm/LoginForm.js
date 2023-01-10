import { useState } from "react";
import styles from "./LoginForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import React from "react";

function LoginForm() {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <FormTextInput
        label="Username"
        inputName="username"
        value={usernameText}
        setStateToNewText={setUsernameText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Password"
        inputName="password"
        type="password"
        value={passwordText}
        setStateToNewText={setPasswordText}
        handleTextChange={handleTextChange}
      />
      <TextButton
        text="Log in"
        type="submit"
        classNames={[styles["login-button"]]}
      />
    </form>
  );
}

export default LoginForm;
