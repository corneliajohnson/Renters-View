import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { LandlordApplicationViews } from "./LandlordApplicationViews";
import { TenantApplicationViews } from "./TenantApplicationViews";

export const RentersView = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("landlord")) {
          return (
            <>
              <LandlordApplicationViews />
            </>
          );
        } else if (localStorage.getItem("tenant")) {
          return (
            <>
              <TenantApplicationViews />
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
