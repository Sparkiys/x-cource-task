import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import "./index.css";
import "./reset.scss";
import "./normalize.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
