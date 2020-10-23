import React from "react";
import { Route } from "react-router-dom";
import { TenantProperty } from "./tenant/property/TenantPropertyList";
import { TenantProvider } from "./landlord/tenants/TenantProvider";
import { PropertyProvider } from "./landlord/property/PropertyProvider";
import { MessageProvider } from "./landlord/messages/MessageProvider";
import { NavBar } from "./tenant/property/nav/NavBar";
import { Footer } from "./landlord/footer/Footer";
import { Home } from "./Home";

export const TenantApplicationViews = () => {
  return (
    <>
      <MessageProvider>
        <PropertyProvider>
          <TenantProvider>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tenant">
              <NavBar />
              <TenantProperty />
              <Footer />
            </Route>
          </TenantProvider>
        </PropertyProvider>
      </MessageProvider>
    </>
  );
};
