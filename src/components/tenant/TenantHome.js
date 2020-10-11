import React from "react";
import { Route } from "react-router-dom";
import { TenantProperty } from "./property/TenantPropertyList";
import { PropertyProvider } from "../landlord/property/PropertyProvider";

export const TenantHome = () => {
  return (
    <>
      <PropertyProvider>
        <Route exact path="/tenant">
          <TenantProperty />
        </Route>
      </PropertyProvider>
    </>
  );
};
