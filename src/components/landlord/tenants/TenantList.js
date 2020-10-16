import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";

export const TenantList = () => {
  const { getTenants, tenants } = useContext(TenantContext);

  useEffect(() => {
    getTenants();
  }, []);

  return (
    <div className="container d-flex justify-content-around">
      <div className="row wrap m-5">
        {tenants.map((tenant) => {
          return (
            <p>
              {tenant.firstName} {tenant.lastName}
            </p>
          );
        })}
      </div>
    </div>
  );
};
