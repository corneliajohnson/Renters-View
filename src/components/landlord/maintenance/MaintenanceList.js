import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";

export const MaintenanceList = () => {
  const { getMaintenanceRequests, maintenanceRequests } = useContext(
    MaintenanceContext
  );

  useEffect(() => {
    getMaintenanceRequests();
  }, []);
  return (
    <div className="container">
      <ListGroup>
        {maintenanceRequests.map((request) => {
          return (
            <MaintenanceCard
              key={request.id}
              request={request}
              editBtn={<EditMaintenanceForm id={request.id} />}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};
