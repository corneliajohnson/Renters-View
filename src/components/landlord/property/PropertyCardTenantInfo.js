import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
let tenantChange = false; //alert when tenant has been added to changed

export const PropertyCardTenantInfo = (propertyId) => {
  const { getPropertyById } = useContext(PropertyContext);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    getPropertyById(propertyId.id).then((response) => {
      setTenants(response.tenants);
    });
  }, [tenantChange]);

  //how to display tenant information on card
  return tenants.length === 0 ? (
    <p style={{ fontWeight: "bold" }}>No Tenants</p>
  ) : tenants.length === 1 ? (
    <p>
      <span style={{ fontWeight: "bold" }}>Tenant:</span>
      {tenants.map((tenant) => ` ${tenant.firstName} ${tenant.lastName}`)}
    </p>
  ) : (
    <p>
      <span style={{ fontWeight: "bold" }}>Tenants:</span>
      {tenants
        .map((tenant) => ` ${tenant.firstName} ${tenant.lastName}`)
        .join(", ")}
    </p>
  );
};

//alert when tenant has been added to changed
export const TenantsChanged = () => {
  if (tenantChange) {
    return (tenantChange = false);
  } else {
    return (tenantChange = true);
  }
};
