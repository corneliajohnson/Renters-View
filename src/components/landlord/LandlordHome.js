import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { PropertyList } from "./property/PropertyList";
import { PropertyProvider } from "./property/PropertyProvider";
import { PropertyForm } from "./property/PropertyForm";

export const LandlordHome = () => {
  return (
    <>
      <NavBar />
      <PropertyProvider>
        <Route exact path="/landlord">
          <PropertyList />
        </Route>
      </PropertyProvider>

      <PropertyProvider>
        <Route exact path="/landlord/property">
          <PropertyForm />
        </Route>
      </PropertyProvider>
    </>
  );
};
