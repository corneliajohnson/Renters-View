import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { addPayment } = useContext(PaymentContext);
  const { tenants, getTenants, getTenantById } = useContext(TenantContext);

  const [payment, setPayment] = useState({});

  useEffect(() => {
    getTenants();
  }, []);

  //get name of each input
  const handleControlledInputChange = (event) => {
    const newPayment = { ...payment };
    newPayment[event.target.name] = event.target.value;
    setPayment(newPayment);
  };

  const constructPaymentObj = () => {
    getTenantById(payment.tenantId).then((response) => {
      addPayment({
        date: payment.date,
        amount: payment.amount,
        propertyId: response.propertyId,
        firstName: response.firstName,
        lastName: response.lastName,
      });
    });
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
        <Form className="text-left">
          <CardLink
            className="d-flex justify-content-end text-danger"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader className="display-3">Add Payment</ModalHeader>

          <FormGroup className="p-2 m-2" row>
            <Label for="tenant" sm={2}>
              Tenants<span className="text-danger">*</span>
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="tenantId"
                onChange={handleControlledInputChange}
              >
                <option value="0"></option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.firstName} {tenant.lastName}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <Row className="p-2 m-2">
            <Col className="m-1">
              <FormGroup row>
                <Label for="payment">
                  Payment Amount<span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="amount"
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
            </Col>
            <Col className="m-1">
              <FormGroup row>
                <Label for="date">
                  Date<span className="text-danger">*</span>
                </Label>
                <Input
                  type="date"
                  name="date"
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <div className="text-right">
          <Button
            outline
            color="success"
            onClick={(event) => {
              event.preventDefault();
              if (payment.amount && payment.date && payment.tenantId) {
                constructPaymentObj();
                onRequestClose();
              }
            }}
          >
            Add
          </Button>
          <Button
            className="m-2"
            outline
            color="secondary"
            type="button"
            onClick={onRequestClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

//add payment button modal
export const PaymentForm = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div className="container text-center">
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button
        onClick={toggleModal}
        outline
        color="secondary"
        className="m-5"
        type="button"
      >
        Add A Payment
      </Button>
    </div>
  );
};
