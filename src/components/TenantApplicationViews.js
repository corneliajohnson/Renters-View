import React from "react";
import { Route } from "react-router-dom";
import { TenantProperty } from "./tenant/property/TenantPropertyList";
import { TenantProvider } from "./landlord/tenants/TenantProvider";
import { PropertyProvider } from "./landlord/property/PropertyProvider";
import { MessageProvider } from "./landlord/messages/MessageProvider";
import { NavBar } from "./tenant/property/nav/NavBar";

export const TenantApplicationViews = () => {
  return (
    <>
      <NavBar />
      <MessageProvider>
        <PropertyProvider>
          <TenantProvider>
            <Route exact path="/tenant">
              <TenantProperty />
            </Route>
          </TenantProvider>
        </PropertyProvider>
      </MessageProvider>
    </>
  );
};
