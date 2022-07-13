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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3002/auth/signup/`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstNameText,
          last_name: lastNameText,
          email: emailText,
          password: passwordText,
          confirm_password: confirmPasswordText,
        }),
      });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <FormTextInput
        label="First Name"
        inputName="first_name"
        value={firstNameText}
        setStateToNewText={setFirstNameText}
        handleTextChange={handleTextChange}
      />
      <FormTextInput
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
