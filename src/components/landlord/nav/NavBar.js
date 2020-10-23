import React from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar sticky-top bg-white">
      <li className="navbar__item active">
        <NavHashLink className="navbar__link" smooth to="/#properties">
          <img
            className="m-0 p-0"
            width="35%"
            src={require("../../../img/logo.png")}
            alt="logo"
          />
        </NavHashLink>
      </li>
      <li className="navbar__item" to="/#tenants">
        <NavHashLink
          className="navbar__link"
          smooth
          to="/#tenants"
          activeStyle={{ color: "#fa2d2d" }}
        >
          Tenants
        </NavHashLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="navbar__link"
          to="/messages"
          activeStyle={{ color: "#fa2d2d" }}
        >
          Messages
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="navbar__link"
          to="/maintenance"
          activeStyle={{ color: "#fa2d2d" }}
        >
          Maintenance
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="navbar__link"
          to="/account"
          activeStyle={{ color: "#fa2d2d" }}
        >
          Account
        </NavLink>
      </li>
    </ul>
  );
};
