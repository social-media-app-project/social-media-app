import styles from "./LoginForm.module.css";
import FormTextInput from "../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../common/form/TextButton/TextButton";
import React, { useState, useContext, useEffect } from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { v4 } from "uuid";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../../services/authService";
import Cookies from "universal-cookie";
function LoginForm() {
  const cookies = new Cookies();
  const auth = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleTextChange = (event, setStateToNewText) => {
    const newText = event.target.value;
    setStateToNewText(newText);
  };
  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const res = await handleLogin({ username, password });
      let data = await res.json();
      if (res.ok) {
        console.log(data);
        auth.setAuthenticated(true);
        cookies.set("token", `${data.token}`, {
          path: "/",
          maxAge: data.expiresIn,
          secure: true,
        });
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // if (!auth.setAuthenticated) {
    //   navigate("/");
    // }
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
        errors.map((error) => {
          return <ErrorMessage key={v4()} msg={error} />;
        })}
      <TextButton
        text="Log in"
        type="submit"
        classNames={[styles["login-button"]]}
        onClick={(e) => handleLoginForm(e)}
      />
    </form>
  );
}

export default LoginForm;
