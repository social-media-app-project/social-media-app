import TextButton from "../../../common/form/TextButton/TextButton";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPanel.css";

function LoginPanel() {
    return <div className="login-panel">
        <div className="login-heading-container">
            <h1 className="login-heading">Welcome</h1>
        </div>
        <div className="inputs-container">
            <LoginForm/>
            <div className="password-button-container">
                <TextButton text="Forgot Password?" classNames={["forgot-password-button"]} type="button" />
            </div>
            <div className="create-button-container">
                <TextButton text="Create a new account" classNames={["create-account-button"]} type="button" />
            </div>
        </div>
    </div>;
}

export default LoginPanel;