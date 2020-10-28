import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import "./NavBar.css";

export const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
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
      <Dropdown
        nav
        className="navbar__item"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle style={{ color: "#f2af58" }} nav caret>
          More
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink
              className="navbar__link"
              to="/payments"
              activeStyle={{ color: "#fa2d2d" }}
            >
              Payments
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink
              className="navbar__link"
              to="/account"
              activeStyle={{ color: "#fa2d2d" }}
            >
              Account
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink
              className="navbar__link"
              to="/login"
              activeStyle={{ color: "#fa2d2d" }}
              onClick={() => localStorage.clear()}
            >
              Logout
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ul>
  );
};
