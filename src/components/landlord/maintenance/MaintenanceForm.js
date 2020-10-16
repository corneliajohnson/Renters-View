import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../property/PropertyProvider";
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

const Modal = ({ onRequestClose }) => {
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
            <Label for="examplePassword">Synopsis</Label>
            <Input type="text" name="synopsis" />
          </FormGroup>
          <FormGroup>
            <Label for="ProopertyId">Address</Label>
            <Col>
              <Input type="select" name="propertyId">
                <option value="0"></option>
              </Input>
            </Col>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">Contractor</Label>
                <Input type="text" name="contractor" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Date Complete</Label>
                <Input type="date" name="dateComplete" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="examplePassword">Notes</Label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              name="note"
              rows="3"
            ></textarea>
          </FormGroup>
        </Form>
        <Button
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            onRequestClose();
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
