import LoginForm from "./LoginForm";
import "./LoginPanel.css";

function LoginPanel() {
    return <div className="login-panel">
        <h1 className="login-heading">Log in</h1>
        <LoginForm/>
        <button className="forgot-password-button">Forgot Password?</button>
        <button className="create-account-button">Create Account</button>
    </div>;
}

export default LoginPanel;