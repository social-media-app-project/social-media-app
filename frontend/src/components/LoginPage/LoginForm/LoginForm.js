import styles from "./LoginForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import React, { useState, useContext, useEffect } from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { v4 } from "uuid";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const auth = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `${process.env.REACT_APP_TEST_URL}auth/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      let data = await response.json();
      if (response.status !== 200) {
        setErrors(data.errors);
      } else if (response.ok) {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresDate", data.expiresDate);
        auth.setAuthenticated(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (auth.setAuthenticated) {
      navigate("/");
    }
  });

  return (
    <form className={styles["login-form"]}>
      <FormTextInput
        label="Username"
        inputName="username"
        value={username}
        setStateToNewText={setUsername}
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
      {errors &&
        errors.map((error, index) => {
          return <ErrorMessage key={v4()} msg={error} />;
        })}
      <TextButton
        text="Log in"
        type="submit"
        classNames={[styles["login-button"]]}
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
}

export default LoginForm;
