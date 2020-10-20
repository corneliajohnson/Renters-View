import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";
import { MaintenanceCheckbox } from "./MaintenanceCheckbox";
import { MaintenanceInfoModal } from "./MaintenanceInfoModal";
import { CardLink } from "reactstrap";

export const MaintenanceList = () => {
  const {
    getMaintenanceRequests,
    maintenanceRequests,
    deleteMaintenanceRequest,
  } = useContext(MaintenanceContext);

  const [filteredRequest, setFilteredRequest] = useState([]);

  useEffect(() => {
    getMaintenanceRequests();
  }, []);

  useEffect(() => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord)
    );
    setFilteredRequest(subsetRequest);
  }, [maintenanceRequests]);

  return (
    <div className="container">
      <ListGroup>
        {filteredRequest.map((request) => {
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
              titleLink={
                <MaintenanceInfoModal
                  id={request.id}
                  synopsis={request.synopsis}
                />
              }
            />
          );
        })}
      </ListGroup>
    </div>
  );
};
