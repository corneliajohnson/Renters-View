import React, { useState, createContext } from "react";

export const TenantContext = createContext();

export const TenantProvider = (props) => {
  const [tenants, setTenants] = useState([]);

  const getTenants = () => {
    return fetch("http://localhost:8088/tenants")
      .then((res) => res.json())
      .then(setTenants);
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        getTenants,
      }}
    >
      {props.children}
    </TenantContext.Provider>
  );
};
