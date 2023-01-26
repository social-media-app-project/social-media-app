import React, { useEffect, useState } from "react";
import styles from "./SignUpPageForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { handleSignup } from "../../../services/authService";
const SignUpPageForm = () => {
  // TODO : DEBOUNCE FOR USERNAME
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_Confirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSignup({
        username: username,
        email: email,
        password: password,
        password_confirm: password_confirm,
      });
      const data = await response.json();
      if (response.ok) {
        setErrors([]);
        setSuccess(true);
        setSuccessMsg("Thank You For Signing Up");
        setTimeout(() => {
          navigate("/login");
        }, 2800);
      } else {
        const val = data.errors.errors;
        setErrors(val);
      }
    } catch (error) {}
  };

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function saveInput() {
    console.log("Saving data");
  }
  const processChange = debounce(() => saveInput());

  useEffect(() => {}, [errors]);
  return (
    <form className={styles["signup-form"]}>
      {success && <SuccessMessage msg={successMsg} />}
      <FormTextInput
        label="Username"
        inputName="user_name"
        value={username}
        setStateToNewText={setUsername}
        handleTextChange={handleTextChange}
        debounce={processChange}
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
      {errors.map((error) => {
        return <ErrorMessage key={v4()} msg={error.msg} />;
      })}
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
