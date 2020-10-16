import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "./landlord/nav/NavBar";
import { PropertyList } from "./landlord/property/PropertyList";
import { PropertyProvider } from "./landlord/property/PropertyProvider";
import { PropertyForm } from "./landlord/property/PropertyForm";
import { TenantProvider } from "./landlord/tenants/TenantProvider";
import { PropertyDetail } from "./landlord/property/PropertyDetail";
import { TenantForm } from "./landlord/tenants/TenantForm";
import { TenantList } from "./landlord/tenants/TenantList";
import { MaintenanceForm } from "./landlord/maintenance/MaintenanceForm";
import { MaintenanceList } from "./landlord/maintenance/MaintenanceList";
import { MaintenanceProvider } from "./landlord/maintenance/MaintenanceProvider";

export const LandlordApplicationViews = () => {
  return (
    <>
      <NavBar />
      <TenantProvider>
        <PropertyProvider>
          <Route exact path="/landlord">
            <PropertyForm />
            <PropertyList />
            <TenantForm />
            <TenantList />
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

      <MaintenanceProvider>
        <Route exact path="/maintenance">
          <MaintenanceForm />
          <MaintenanceList />
        </Route>
      </MaintenanceProvider>
    </>
  );
};
