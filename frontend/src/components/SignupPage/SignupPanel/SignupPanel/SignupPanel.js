import { React, useState } from "react";
import styles from "./SignupPanel.module.css";
import TextButton from "../../../common/form/TextButton/TextButton";
import SignupForm from "../../SignupForm/SignupForm";
import { Link } from "react-router-dom";

const SignupPanel = () => {
  const [errors, setErrors] = useState([]);
  return (
    <div className={styles["login-panel"]}>
      <div className={styles["login-heading-container"]}>
        <h1 className={styles["login-heading"]}>Welcome</h1>
      </div>
      <div className={styles["inputs-container"]}>
        <SignupForm setErrors={setErrors} />
        {/* {errors.length >0 && 
          errors.forEach((err) =>{
            return <p>err</p>
          })
        } */}
        <hr></hr>
        <div className={styles["create-button-container"]}>
          <Link to="/login">
            <TextButton
              text="Already have an account"
              classNames={[styles["create-account-button"]]}
              type="button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPanel;
