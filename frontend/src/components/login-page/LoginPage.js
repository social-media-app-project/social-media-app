import LoginForm from "./LoginForm";
import LoginImage from "./LoginImage";
import "./LoginPage.css";

function LoginPage() {
    return <div className="login-page">
        <div className="login-container">
            <LoginImage />
            <LoginForm/>
        </div>
    </div>;
}

export default LoginPage;