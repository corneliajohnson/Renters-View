import React from "react";
import { Route } from "react-router-dom";
import { TenantHome } from "./tenant/TenantHome";

export const TenantApplicationViews = () => {
  return (
    <>
      <Route exact path="/tenant">
        <TenantHome />
      </Route>
    </>
  );
};
