import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";

export const PropertyCardTenantInfo = (propertyId) => {
  const { getPropertyById } = useContext(PropertyContext);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    getPropertyById(propertyId.id).then((response) => {
      setTenants(response.tenants);
    });
  }, []);
  return tenants.length === 0 ? (
    <p>No Tenants</p>
  ) : tenants.length === 1 ? (
    <p>
      Tenant:
      {tenants.map((tenant) => ` ${tenant.firstName} ${tenant.lastName}`)}
    </p>
  ) : (
    <p>
      Tenants:
      {tenants
        .map((tenant) => ` ${tenant.firstName} ${tenant.lastName}`)
        .join(", ")}
    </p>
  );
};
