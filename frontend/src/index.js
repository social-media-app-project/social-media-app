import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const fun = (hr) => {
  console.log("wow");
  if (true) {
    console.log("ge");
  }
  console.log("wow");
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
