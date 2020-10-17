import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/landlord">
          <img
            className="m-0 p-0"
            width="40%"
            src={require("../../../img/logo.png")}
            alt="logo"
          />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/messages">
          Messages
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/maintenance">
          Maintenance
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/account">
          Account
        </Link>
      </li>
    </ul>
  );
};
