import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/landlord">
          Logo
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
