import React, { useState, createContext } from "react";

export const MaintenanceContext = createContext();

export const MaintenanceProvider = (props) => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  const getMaintenanceRequests = () => {
    return fetch("http://localhost:8088/maintenanceRequests?_expand=property")
      .then((res) => res.json())
      .then(setMaintenanceRequests);
  };

  const addMaintenaceRequest = (maintenaceObj) => {
    return fetch("http://localhost:8088/maintenanceRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintenaceObj),
    }).then(getMaintenanceRequests);
  };
  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceRequests,
        getMaintenanceRequests,
        addMaintenaceRequest,
      }}
    >
      {props.children}
    </MaintenanceContext.Provider>
  );
};
