import LoginPanel from "../login-panel/LoginPanel/LoginPanel";
import "./LoginPage.css";

function LoginPage() {
    return <div className="login-page">
        <div className="login-container">
            <LoginPanel />
        </div>
    </div>;
}

export default LoginPage;