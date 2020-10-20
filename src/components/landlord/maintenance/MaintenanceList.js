import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";
import { MaintenanceInfoModal } from "./MaintenanceInfoModal";
import { Button, ButtonGroup } from "reactstrap";
import "./Maintenance.css";

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
    allRequest();
  }, [maintenanceRequests]);

  const allRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord)
    );
    setFilteredRequest(subsetRequest);
  };

  const completeRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord) &&
        request.complete === true
    );
    setFilteredRequest(subsetRequest);
  };

  const pendingRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord) &&
        request.complete === false
    );
    setFilteredRequest(subsetRequest);
  };

  return (
    <div className="container">
      <div className="text-center">
        <ButtonGroup>
          <Button outline color="secondary" onClick={() => allRequest()}>
            All Request
          </Button>
          <Button outline color="secondary" onClick={() => pendingRequest()}>
            PendingRequest
          </Button>
          <Button outline color="secondary" onClick={() => completeRequest()}>
            Complete Request
          </Button>
        </ButtonGroup>
      </div>
      <small className="text-secondary">
        Add date to task to mark as complete
      </small>
      <ListGroup>
        {filteredRequest.map((request) => {
          return (
            <MaintenanceCard
              key={request.id}
              request={request}
              deleteBtn={
                <Button
                  className="m-1 maintenanceBtn"
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
