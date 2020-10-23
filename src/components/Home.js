import React from "react";
import { Button } from "reactstrap";
import homeImage from "../img/homeBackground.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div
        className="fixed-top"
        style={{
          backgroundImage: "url(" + homeImage + ")",
          backgroundSize: "cover",
          height: "100vh",
          color: "#fa2d2d",
        }}
      >
        <div
          style={{ position: "fixed", top: "10%", left: "30%", right: "30%" }}
          className="m-5 text-center"
        >
          <img
            className="m-0 p-0"
            width="40%"
            src={require("../img/logo.png")}
            alt="logo"
          />
          <h1 className="display-1">Welcome to Renter's View</h1>
          <Link to="/login">
            <Button size="lg" color="danger" className="m-5">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" color="danger" className="m-5">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
