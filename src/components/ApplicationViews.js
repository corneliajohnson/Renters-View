import React from "react";
import { Route } from "react-router-dom";
import { LandlordHome } from "./landlord/LandlordHome";
import { PropertyList } from "./landlord/property/PropertyList";
import { PropertyProvider } from "./landlord/property/PropertyProvider";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/landlord">
        <LandlordHome />
      </Route>
    </>
  );
};
