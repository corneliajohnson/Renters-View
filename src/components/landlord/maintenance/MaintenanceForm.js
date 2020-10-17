import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../property/PropertyProvider";
import { MaintenanceContext } from "./MaintenanceProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  CardLink,
} from "reactstrap";
let requestId = 0;

const Modal = ({ onRequestClose }) => {
  const { getProperties, properties } = useContext(PropertyContext);
  const {
    getMaintenanceRequestById,
    addMaintenaceRequest,
    updateMaintenaceRequest,
  } = useContext(MaintenanceContext);

  const [request, setRequest] = useState({});

  //for property dropdown
  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    if (requestId) {
      getMaintenanceRequestById(requestId).then((request) => {
        setRequest(request);
      });
    }
  }, []);

  const handleControlledInputChange = (event) => {
    const newRequest = { ...request };
    newRequest[event.target.name] = event.target.value;
    setRequest(newRequest);
  };

  const constructRequestObj = () => {
    if (request.id) {
      updateMaintenaceRequest({
        id: request.id,
        propertyId: parseInt(request.propertyId),
        synopsis: request.synopsis,
        price: request.price,
        contractor: request.contractor,
        complete: request.dateComplete ? true : false,
        note: request.note,
        dateComplete: request.dateComplete ? request.dateComplete : false,
        dateAdded: Date.now(),
      });
    } else {
      addMaintenaceRequest({
        propertyId: parseInt(request.propertyId),
        synopsis: request.synopsis,
        price: request.price,
        contractor: request.contractor,
        complete: request.dateComplete ? true : false,
        note: request.note,
        dateComplete: request.dateComplete ? request.dateComplete : false,
        dateAdded: Date.now(),
      });
    }
  };

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
        <Form>
          <CardLink
            className="d-flex justify-content-end"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader className="mb-3">Add Maintenance Request</ModalHeader>
          <FormGroup>
            <Label for="examplePassword">
              Synopsis <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="synopsis"
              onChange={handleControlledInputChange}
              value={request.synopsis}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="ProopertyId">
              Address <span className="text-danger">*</span>
            </Label>
            <Col>
              <Input
                type="select"
                name="propertyId"
                value={request.propertyId}
                onChange={handleControlledInputChange}
                value={request.propertyId}
              >
                <option value="0"></option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.street} {property.city} {property.state}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <Row form>
            <Col sm={4}>
              <FormGroup>
                <Label for="firstName">Contractor</Label>
                <Input
                  type="text"
                  name="contractor"
                  onChange={handleControlledInputChange}
                  value={request.contractor}
                />
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  onChange={handleControlledInputChange}
                  value={request.price}
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <FormGroup>
                <Label for="dateComplete">Date Complete</Label>
                <Input
                  required
                  type="date"
                  name="dateComplete"
                  onChange={handleControlledInputChange}
                  value={request.dateComplete}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="examplePassword">Notes</Label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="note"
              rows="3"
              onChange={handleControlledInputChange}
              value={request.note}
            ></textarea>
          </FormGroup>
          <p className="text-danger">
            All fields with * are required to submit form.
          </p>
        </Form>
        <Button
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            if (request.synopsis && request.propertyId) {
              constructRequestObj();
              onRequestClose();
            }
          }}
        >
          Add
        </Button>
        <Button type="button" onClick={onRequestClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export const MaintenanceForm = () => {
  requestId = 0;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div className="container text-center">
      <h1 className="display-2 m-5">Maintenance Requests</h1>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button onClick={toggleModal} type="button">
        Add Maintenance Request
      </Button>
    </div>
  );
};

export const EditMaintenanceForm = (requestObjId) => {
  requestId = requestObjId.id;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div className="container text-center">
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <CardLink onClick={toggleModal} type="button">
        Edit
      </CardLink>
    </div>
  );
};
