import React from "react";
import ReactDOM from "react-dom";
import { RentersView } from "./components/RentersView";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RentersView />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
