import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";

export const MaintenanceList = () => {
  const { getMaintenanceRequests, maintenanceRequests } = useContext(
    MaintenanceContext
  );

  useEffect(() => {
    getMaintenanceRequests();
  }, []);
  return (
    <>
      {maintenanceRequests.map((request) => {
        return <p>{request.synopsis}</p>;
      })}
    </>
  );
};
