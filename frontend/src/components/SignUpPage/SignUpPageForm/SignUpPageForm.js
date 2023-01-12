import React, { useState } from "react";
import styles from "./SignUpPageForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
const SignUpPageForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_Confirm] = useState("");

  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3002/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          username,
          email,
          password,
          password_confirm,
        },
      });
      let data = await res.json();
      console.log(data);
    } catch (error) {}
  };
  return (
    <form className={styles["signup-form"]}>
      <FormTextInput
        label="Username"
        inputName="user_name"
        value={username}
        setStateToNewText={setUsername}
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
        inputName="password_confirm"
        value={password_confirm}
        type="password"
        setStateToNewText={setPassword_Confirm}
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
