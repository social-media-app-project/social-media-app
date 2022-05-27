import LoginPanel from "../login-panel/LoginPanel/LoginPanel";
import styles from "./LoginPage.module.css";

function LoginPage() {
    return <div className={styles["login-page"]}>
        <div className={styles["login-container"]}>
            <LoginPanel />
        </div>
    </div>;
}

export default LoginPage;