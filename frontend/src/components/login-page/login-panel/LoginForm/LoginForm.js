import { useState } from "react";
import "./LoginForm.css";
import FormTextInput from "../../../common/form/FormTextInput/FormTextInput";
import TextButton from "../../../common/form/TextButton/TextButton";

function LoginForm() {
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleTextChange = (event, setStateToNewText) => {
        const newText = event.target.value;
        setStateToNewText(newText);
    }

    return <form onSubmit={handleSubmit} className="login-form">
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
                value={passwordText}
                setStateToNewText={setPasswordText}
                handleTextChange={handleTextChange}
            />
            <TextButton text="Log in" type="submit" classNames={["login-button"]} />
        </form>;
}

export default LoginForm;