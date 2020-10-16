import React, { useState, createContext } from "react";

export const TenantContext = createContext();

export const TenantProvider = (props) => {
  const [tenants, setTenants] = useState([]);

  const getTenants = () => {
    return fetch("http://localhost:8088/tenants?_expand=property")
      .then((res) => res.json())
      .then(setTenants);
  };

  const addTenant = (tenantObj) => {
    return fetch("http://localhost:8088/tenants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tenantObj),
    }).then(getTenants);
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        getTenants,
        addTenant,
      }}
    >
      {props.children}
    </TenantContext.Provider>
  );
};
