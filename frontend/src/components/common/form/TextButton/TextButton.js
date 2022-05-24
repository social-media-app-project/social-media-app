import React from 'react';
import "./TextButton.css";


const TextButton = props => (
  <button style={props.style} className={props.classNames ? ["text-button", ...props.classNames].join(" ") : "text-button"} type={props.type}>{props.text}</button>
);

export default TextButton;
