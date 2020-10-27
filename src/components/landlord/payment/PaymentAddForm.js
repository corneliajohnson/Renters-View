import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
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
  UncontrolledTooltip,
} from "reactstrap";
let tenantInfo = {}; //gobal: will hold the tenant object

const Modal = ({ onRequestClose }) => {
  const { addPayment } = useContext(PaymentContext);

  const [payment, setPayment] = useState({});

  //get name of each input
  const handleControlledInputChange = (event) => {
    const newPayment = { ...payment };
    newPayment[event.target.name] = event.target.value;
    setPayment(newPayment);
  };

  //add a payment to database
  const constructPaymentObj = () => {
    const amountInt = parseFloat(payment.amount);
    addPayment({
      firstName: tenantInfo.firstName,
      lastName: tenantInfo.lastName,
      propertyId: tenantInfo.propertyId,
      date: payment.date,
      amount: parseFloat(amountInt).toFixed(2),
    }).then(() => notify());
  };

  //taost when a payment is added
  const notify = () => {
    toast.success("Payment Added", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
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
          <ModalHeader className="display-3">
            Add Payment by {tenantInfo.firstName} {tenantInfo.lastName}
          </ModalHeader>
        </Form>
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
        <div className="text-right">
          <Button
            outline
            color="success"
            onClick={(event) => {
              event.preventDefault();
              if (payment.amount && payment.date) {
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
export const PaymentAddForm = (tenantObj) => {
  tenantInfo = tenantObj.tenant; //change the tenant object
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div className="container text-center">
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button
        id="UncontrolledTooltip"
        style={{ color: "#85bb65", fontSize: "1.5em" }}
        onClick={toggleModal}
        color="link"
        type="button"
      >
        <FontAwesomeIcon icon={faMoneyBill} />
      </Button>
      <UncontrolledTooltip placement="top" target="UncontrolledTooltip">
        Add A Payment
      </UncontrolledTooltip>
    </div>
  );
};
