import React, { useContext, useEffect, useState } from "react";

import { PropertyContext } from "./PropertyProvider";

export const PropertyCardTenantInfo = (propertyId) => {
  const { getPropertyById, deleteProperty } = useContext(PropertyContext);
  const [property, setProperty] = useState({});
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    getPropertyById(propertyId.id).then((response) => {
      setProperty(response);
      setTenants(response.tenants);
    });
  }, []);
  return tenants.length === 0 ? (
    "Not Tenants"
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
