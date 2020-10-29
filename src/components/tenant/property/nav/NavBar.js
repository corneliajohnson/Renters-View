import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, NavbarBrand, NavLink } from "reactstrap";

export const NavBar = () => {
  const history = useHistory();
  return (
    <div style={{ opacity: "0.9" }} className="sticky-top mb-5">
      <Navbar
        color="light"
        light
        expand="md"
        className="justify-content-between bg-white"
      >
        <NavbarBrand>
          <img
            className="m-0 p-0"
            width="40%"
            src={require("../../../../img/logo.png")}
            alt="logo"
          />
        </NavbarBrand>
        <div>
          <h1 className="display-3" style={{ color: "#fa2d2d" }}>
            Renter's View
          </h1>
          <NavLink
            className="navbar__link"
            style={{ color: "#fa2d2d", cursor: "pointer" }}
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            Logout
          </NavLink>
        </div>
      </Navbar>
    </div>
  );
};
