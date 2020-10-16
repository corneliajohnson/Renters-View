import React from "react";
import { Route } from "react-router-dom";
import { LandlordHome } from "./landlord/LandlordHome";

export const LandlordApplicationViews = () => {
  return (
    <>
      <Route path="/landlord">
        <LandlordHome />
      </Route>
    </>
  );
};
