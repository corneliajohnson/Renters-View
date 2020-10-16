import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { TenantCard } from "./TenantCard";

export const TenantList = () => {
  const { getTenants, tenants } = useContext(TenantContext);

  useEffect(() => {
    getTenants();
  }, []);

  return (
    <div className="container d-flex justify-content-around">
      <div className="row wrap m-5">
        {tenants.map((tenant) => {
          return <TenantCard key={tenant.id} tenant={tenant} />;
        })}
      </div>
    </div>
  );
};
