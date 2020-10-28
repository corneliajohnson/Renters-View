import React, { useContext, useEffect, useState } from "react";
import {
  CardLink,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap";
import { MaintenanceContext } from "./MaintenanceProvider";
import { DateString } from "../date/DateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

let requestId = 0; //goal id for maintenance request

const Modal = ({ onRequestClose }) => {
  const { getMaintenanceRequestById } = useContext(MaintenanceContext);
  const [request, setRequest] = useState({});
  const [property, setProperty] = useState({});

  //get individual maintenance request
  useEffect(() => {
    if (requestId) {
      getMaintenanceRequestById(requestId).then((request) => {
        setRequest(request);
        setProperty(request.property);
      });
    }
  }, []);

  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <CardLink
          className="d-flex justify-content-end text-danger"
          type="button"
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CardLink>
        <ModalHeader>
          <CardTitle className="display-4">{request.synopsis}</CardTitle>
        </ModalHeader>
        <ModalBody style={{ fontSize: "0.7em" }}>
          <p>
            Address: {property.street} {property.city} {property.state}{" "}
            {property.zip}
          </p>
          <p>Contractor: {request.contractor ? request.contractor : "N/A"}</p>
          <p>Price: {request.price ? request.price : "N/A"}</p>
          <p>Complete: {request.complete ? "Yes" : "No"}</p>
          <p>
            Date Complete:{" "}
            {request.dateComplete ? DateString(request.dateComplete) : "N/A"}
          </p>
          <p>
            Date Added:{" "}
            {new Date(request.dateAdded).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>Note: {request.note ? request.note : "N/A"}</p>
        </ModalBody>
        <Button
          type="button"
          outline
          color="secondary"
          onClick={onRequestClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export const MaintenanceInfoModal = (requestObj) => {
  requestId = requestObj.id;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  return (
    <div>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      {/* link shown on page */}
      <CardLink
        id="UncontrolledTooltip"
        className="mainentanceCardLink propertyCardLink"
        onClick={toggleModal}
        type="button"
      >
        {requestObj.synopsis}
      </CardLink>
      <UncontrolledTooltip placement="right" target="UncontrolledTooltip">
        More Info
      </UncontrolledTooltip>
    </div>
  );
};
