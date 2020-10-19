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

  const deleteTenant = (tenantId) => {
    return fetch(`http://localhost:8088/tenants/${tenantId}`, {
      method: "DELETE",
    }).then(getTenants);
  };

  const updateTenant = (tenant) => {
    return fetch(`http://localhost:8088/tenants/${tenant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tenant),
    }).then(getTenants);
  };

  const getTenantById = (id) => {
    return fetch(`http://localhost:8088/tenants/${id}`, {}).then((res) =>
      res.json()
    );
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        getTenants,
        addTenant,
        deleteTenant,
        updateTenant,
        getTenantById,
      }}
    >
      {props.children}
    </TenantContext.Provider>
  );
};
