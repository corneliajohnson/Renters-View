import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { PropertyList } from "./property/PropertyList";
import { PropertyProvider } from "./property/PropertyProvider";
import { PropertyForm } from "./property/PropertyForm";
import { TenantProvider } from "./tenants/TenantProvider";
import { PropertyDetail } from "./property/PropertyDetail";

export const LandlordHome = () => {
  return (
    <>
      <NavBar />
      <TenantProvider>
        <PropertyProvider>
          <Route exact path="/landlord">
            <PropertyForm />
            <PropertyList />
          </Route>
        </PropertyProvider>
      </TenantProvider>

      <TenantProvider>
        <PropertyProvider>
          <Route exact path="/landlord/property/:propertyId(\d+)">
            <PropertyDetail />
          </Route>
        </PropertyProvider>
      </TenantProvider>
    </>
  );
};
