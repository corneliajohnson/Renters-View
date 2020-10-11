import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ApplicationViews } from "./ApplicationViews";
import { LandlordHome } from "./landlord/LandlordHome";

export const RentersView = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("rv_customer")) {
          return (
            <>
              <LandlordHome />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
  </>
);
