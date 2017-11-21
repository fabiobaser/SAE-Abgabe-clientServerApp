import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "semantic-ui-css/semantic.css";
import "./overwrite.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
