import LoginPanel from "./LoginPanel";
import LoginImage from "./LoginImage";
import "./LoginPage.css";

function LoginPage() {
    return <div className="login-page">
        <div className="login-container">
            <LoginImage />
            <LoginPanel />
        </div>
    </div>;
}

export default LoginPage;