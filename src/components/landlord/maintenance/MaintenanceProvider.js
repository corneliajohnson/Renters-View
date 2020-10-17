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

  const getMaintenanceRequestById = (id) => {
    return fetch(
      `http://localhost:8088/maintenanceRequests/${id}?_expand=property`,
      {}
    ).then((res) => res.json());
  };

  const updateMaintenaceRequest = (maintenanceObj) => {
    return fetch(
      `http://localhost:8088/maintenanceRequests/${maintenanceObj.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maintenanceObj),
      }
    ).then(getMaintenanceRequests);
  };

  const deleteMaintenanceRequest = (id) => {
    return fetch(`http://localhost:8088/maintenanceRequests/${id}`, {
      method: "DELETE",
    }).then(getMaintenanceRequests);
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceRequests,
        getMaintenanceRequests,
        addMaintenaceRequest,
        getMaintenanceRequestById,
        updateMaintenaceRequest,
        deleteMaintenanceRequest,
      }}
    >
      {props.children}
    </MaintenanceContext.Provider>
  );
};
