import React from "react";
import ReactDOM from "react-dom";
import { RentersView } from "./components/RentersView";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <React.Fragment>
    <Router>
      <RentersView />
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
