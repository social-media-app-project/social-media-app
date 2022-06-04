import styles from "./FormTextInput.module.css";
import React from 'react';

function FormTextInput(props) {
    return <div className={styles["text-input-group"]}>
        <label htmlFor={props.inputName} className={styles["text-input-label"]}>{props.label}</label>
        <input type="text"
            className={styles["text-input"]}
            id={props.inputName}
            name={props.inputName}
            value={props.value}
            onChange={event => props.handleTextChange(event, props.setStateToNewText)}>
        </input>
    </div>;
}

export default FormTextInput;