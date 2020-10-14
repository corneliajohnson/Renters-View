import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { PropertyList } from "./property/PropertyList";
import { PropertyProvider } from "./property/PropertyProvider";
import { PropertyForm } from "./property/PropertyForm";
import { TenantProvider } from "./tenants/TenantProvider";

export const LandlordHome = () => {
  return (
    <>
      <NavBar />
      <TenantProvider>
        <PropertyProvider>
          <Route exact path="/landlord">
            <PropertyForm />
          </Route>
        </PropertyProvider>
      </TenantProvider>

      <PropertyProvider>
        <Route exact path="/landlord">
          <PropertyList />
        </Route>
      </PropertyProvider>
    </>
  );
};
