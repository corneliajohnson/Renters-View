import React from "react";
import { Route } from "react-router-dom";
import { TenantProperty } from "./tenant/property/TenantPropertyList";
import { TenantProvider } from "./landlord/tenants/TenantProvider";

export const TenantApplicationViews = () => {
  return (
    <>
      <TenantProvider>
        <Route exact path="/tenant">
          <TenantProperty />
        </Route>
      </TenantProvider>
    </>
  );
};
