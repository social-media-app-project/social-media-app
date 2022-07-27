import { React, useState } from "react";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import styles from "./SignupForm.module.css";
function SignupForm(props) {
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstNameText,
      last_name: lastNameText,
      email: emailText,
      password: passwordText,
      password_confirm: confirmPasswordText,
    };
    try {
      const signUpResponse = await fetch("http://localhost:3002/auth/signup/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      });
      const valid = await signUpResponse.json();
      if (signUpResponse.status === 200) {
        props.setUserAuth(true);
        localStorage.setItem("token", valid.token);
        localStorage.setItem("expires", valid.expiresDate);
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={(e) => {
        signupSubmit(e);
      }}
      className={styles["login-form"]}
    >
      <FormTextInput
        type="text"
        label="First Name"
        inputName="first_name"
        value={firstNameText}
        setStateToNewText={setFirstNameText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        type="text"
        label="Last Name"
        inputName="last_name"
        value={lastNameText}
        setStateToNewText={setLastNameText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        type="email"
        label="Email"
        inputName="email"
        value={emailText}
        setStateToNewText={setEmailText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        type="password"
        label="Password"
        inputName="password"
        value={passwordText}
        setStateToNewText={setPasswordText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
        type="password"
        label="Confirm Password"
        inputName="confirm_password"
        value={confirmPasswordText}
        setStateToNewText={setConfirmPasswordText}
        handleTextChange={handleTextChange}
      />
      <TextButton
        text="Sign up"
        type="submit"
        classNames={[styles["login-button"]]}
      />
    </form>
  );
}

export default SignupForm;
