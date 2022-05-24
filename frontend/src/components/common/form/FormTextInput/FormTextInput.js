import "./FormTextInput.css";

function FormTextInput(props) {
    return <div className="text-input-group">
        <label htmlFor={props.inputName} className="text-input-label">{props.label}</label>
        <input type="text"
            className="text-input"
            id={props.inputName}
            name={props.inputName}
            value={props.value}
            onChange={event => props.handleTextChange(event, props.setStateToNewText)}>
        </input>
    </div>;
}

export default FormTextInput;