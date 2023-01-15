import React, { useEffect, useState } from "react";
import styles from "./SignUpPageForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
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
      let res = await fetch(`${process.env.REACT_APP_TEST_URL}auth/signup`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password_confirm: password_confirm,
        }),
      });
      let data = await res.json();
      if (res.status !== 200) {
        let val = data.errors.errors;
        setErrors(val);
      } else {
        setErrors([]);
        setSuccess(true);
        setSuccessMsg("Thank You For Signing Up");
        setTimeout(() => {
          navigate("/login");
        }, 2800);
      }
    } catch (error) {}
  };
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
