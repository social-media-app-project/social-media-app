import { useState } from "react";
import "./LoginForm.css";
import FormTextInput from "../common/form/FormTextInput";

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
            <button type="submit">Log in</button>
        </form>;
}

export default LoginForm;