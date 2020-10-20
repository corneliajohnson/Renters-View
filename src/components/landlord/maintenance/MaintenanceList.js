import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";
import { MaintenanceInfoModal } from "./MaintenanceInfoModal";
import { Button } from "reactstrap";

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
                <Button
                  className="m-1"
                  outline
                  color="danger"
                  onClick={() => {
                    deleteMaintenanceRequest(request.id);
                  }}
                >
                  {" "}
                  Delete
                </Button>
              }
              editBtn={<EditMaintenanceForm id={request.id} />}
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
