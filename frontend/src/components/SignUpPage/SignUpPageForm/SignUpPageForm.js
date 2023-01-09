import React, { useState } from "react";
import styles from "./SignUpPageForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
const SignUpPageForm = () => {
  const [firstName, setFirstName] = useState("bob");
  const [lastName, setLastName] = useState("bobb");
  const [email, setEmail] = useState("bobb");
  const [password, setPassword] = useState("bobb");
  const [password_2, setPassword_2] = useState("bobb");

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
        label="First Name"
        inputName="first_name"
        value={firstName}
        setStateToNewText={setFirstName}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Last Name"
        inputName="last_name"
        value={lastName}
        setStateToNewText={setLastName}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        label="Email"
        inputName="email"
        value={email}
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
      />
    </form>
  );
};

export default SignUpPageForm;
