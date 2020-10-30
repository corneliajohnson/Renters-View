import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { ListGroup, Badge } from "reactstrap";
import { MaintenanceCard } from "./MaintenanceCard";
import { EditMaintenanceForm } from "./MaintenanceForm";
import { MaintenanceInfoModal } from "./MaintenanceInfoModal";
import { Button, ButtonGroup } from "reactstrap";
import { MaintenanceDelete } from "./MaintenanceDelete";
import "./Maintenance.css";
import { PaginationPages } from "../paginantion/PaginationPages";

export const MaintenanceList = () => {
  const { getMaintenanceRequests, maintenanceRequests } = useContext(
    MaintenanceContext
  );

  const [filteredRequest, setFilteredRequest] = useState([]);
  const [total, setTotal] = useState();
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  //get all maintenance request
  useEffect(() => {
    getMaintenanceRequests();
  }, []);

  useEffect(() => {
    allRequest();
  }, [maintenanceRequests]);

  // show maintnenace request  for loged in landlord
  const allRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord)
    );
    setFilteredRequest(subsetRequest);
  };

  //get total of filtered maintenance request
  useEffect(() => {
    const amountTotalAll = filteredRequest.reduce(
      (acc, request) => acc + parseFloat(request.price),
      0
    );
    setTotal(amountTotalAll.toFixed(2));
  }, [filteredRequest]);

  //show complete request
  const completeRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord) &&
        request.complete === true
    );
    setFilteredRequest(subsetRequest);
  };

  //show pending request
  const pendingRequest = () => {
    const subsetRequest = maintenanceRequests.filter(
      (request) =>
        request.property.landlordId === parseInt(localStorage.landlord) &&
        request.complete === false
    );
    setFilteredRequest(subsetRequest);
  };

  //Get current payments for paginantion
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequest.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  //change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mb-5" style={{ width: "100vh" }}>
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
      <Badge className="float-right" color="dark">
        Total Paid in Maintenance ${total}
      </Badge>
      <ListGroup>
        {currentRequests.map((request) => {
          return (
            <MaintenanceCard
              key={request.id}
              request={request}
              deleteBtn={<MaintenanceDelete id={request.id} />}
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
      <PaginationPages
        postsPerPage={requestsPerPage}
        totalPosts={filteredRequest.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
