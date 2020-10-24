import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "./landlord/nav/NavBar";
import { PropertyList } from "./landlord/property/PropertyList";
import { PropertyProvider } from "./landlord/property/PropertyProvider";
import { PropertyForm } from "./landlord/property/PropertyForm";
import { TenantProvider } from "./landlord/tenants/TenantProvider";
import { TenantForm } from "./landlord/tenants/TenantForm";
import { TenantList } from "./landlord/tenants/TenantList";
import { MaintenanceForm } from "./landlord/maintenance/MaintenanceForm";
import { MaintenanceList } from "./landlord/maintenance/MaintenanceList";
import { MaintenanceProvider } from "./landlord/maintenance/MaintenanceProvider";
import { AccountView } from "./landlord/account/AccountView";
import { LandlordProvider } from "./landlord/account/LandlordProvider";
import { MessageList } from "./landlord/messages/MessageList";
import { MessageProvider } from "./landlord/messages/MessageProvider";
import { Footer } from "./landlord/footer/Footer";
import { CloudinaryProvider } from "./landlord/cloudinary/CloudinaryProvider";
import { PaymentProvider } from "./landlord/payment/PaymentProvider";
import { PaymentList } from "./landlord/payment/PaymentList";

export const LandlordApplicationViews = () => {
  return (
    <>
      <NavBar />
      <PaymentProvider>
        <CloudinaryProvider>
          <TenantProvider>
            <PropertyProvider>
              <Route exact path="/">
                <PropertyForm />
                <PropertyList />
                <TenantForm />
                <TenantList />
              </Route>
            </PropertyProvider>
          </TenantProvider>
        </CloudinaryProvider>
      </PaymentProvider>

      <PropertyProvider>
        <MaintenanceProvider>
          <Route exact path="/maintenance">
            <MaintenanceForm />
            <MaintenanceList />
          </Route>
        </MaintenanceProvider>
      </PropertyProvider>

      <CloudinaryProvider>
        <LandlordProvider>
          <Route exact path="/account">
            <AccountView />
          </Route>
        </LandlordProvider>
      </CloudinaryProvider>

      <TenantProvider>
        <MessageProvider>
          <Route exact path="/messages">
            <MessageList />
          </Route>
        </MessageProvider>
      </TenantProvider>

      <PaymentProvider>
        <TenantProvider>
          <PropertyProvider>
            <Route exact path="/payments">
              <PaymentList />
            </Route>
          </PropertyProvider>
        </TenantProvider>
      </PaymentProvider>
      <Footer />
    </>
  );
};
