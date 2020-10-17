import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";
import { MaintenanceCheckbox } from "./MaintenanceCheckbox";
import { CardLink } from "reactstrap";

export const MaintenanceList = () => {
  const {
    getMaintenanceRequests,
    maintenanceRequests,
    deleteMaintenanceRequest,
  } = useContext(MaintenanceContext);

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
              deleteBtn={
                <CardLink
                  onClick={() => {
                    deleteMaintenanceRequest(request.id);
                  }}
                >
                  {" "}
                  Delete
                </CardLink>
              }
              editBtn={<EditMaintenanceForm id={request.id} />}
              checkbox={<MaintenanceCheckbox id={request.id} />}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};
