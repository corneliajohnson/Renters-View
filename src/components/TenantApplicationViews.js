import React from "react";
import { Route } from "react-router-dom";
import { TenantProperty } from "./tenant/property/TenantPropertyList";
import { TenantProvider } from "./landlord/tenants/TenantProvider";
import { PropertyProvider } from "./landlord/property/PropertyProvider";
import { MessageProvider } from "./landlord/messages/MessageProvider";

export const TenantApplicationViews = () => {
  return (
    <>
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
