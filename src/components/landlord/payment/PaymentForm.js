import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
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
import { Edit } from "@material-ui/icons";
let paymentId = 0;

const Modal = ({ onRequestClose }) => {
  const { addPayment, getPaymentById, updatePayment } = useContext(
    PaymentContext
  );
  const { tenants, getTenants, getTenantById } = useContext(TenantContext);

  const [payment, setPayment] = useState({});
  const [tenantId, setTenantId] = useState();

  //taost when a payment is added
  const notifyAdd = () => {
    toast.success("Payment Added", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  //taost when a payment is updated
  const notifyUpdate = () => {
    toast.success("Payment Updated", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  //get tenants for dropdown
  useEffect(() => {
    getTenants();
  }, []);

  useEffect(() => {
    if (paymentId !== 0) {
      //get the information to edit
      getPaymentById(paymentId).then((response) => {
        setPayment(response);
      });
    }
  }, []);

  //find the tenant for edit
  useEffect(() => {
    const tenantByName = tenants.find(
      (tenant) =>
        tenant.firstName === payment.firstName &&
        tenant.lastName === tenant.lastName
    );
    setTenantId(tenantByName);
  }, [payment]);

  //get name of each input
  const handleControlledInputChange = (event) => {
    const newPayment = { ...payment };
    newPayment[event.target.name] = event.target.value;
    setPayment(newPayment);
  };

  const constructPaymentObj = () => {
    getTenantById(payment.tenantId).then((response) => {
      const amountInt = parseFloat(payment.amount);
      if (payment.id) {
        updatePayment({
          id: payment.id,
          date: payment.date,
          amount: parseFloat(amountInt).toFixed(2),
          propertyId: response.propertyId,
          firstName: response.firstName,
          lastName: response.lastName,
        }).then(() => notifyUpdate());
      } else {
        addPayment({
          date: payment.date,
          amount: parseFloat(amountInt).toFixed(2),
          propertyId: response.propertyId,
          firstName: response.firstName,
          lastName: response.lastName,
        }).then(() => notifyAdd());
      }
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
          <ModalHeader className="display-3">Payment</ModalHeader>

          <FormGroup className="p-2 m-2" row>
            <Label for="tenant" sm={2}>
              Tenants<span className="text-danger">*</span>
            </Label>

            <Col sm={10}>
              <Input
                type="select"
                name="tenantId"
                value={tenantId ? tenantId.id : payment.firstName}
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
                  defaultValue={payment.amount}
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
                  defaultValue={payment.date}
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
              if (
                payment.amount &&
                payment.date &&
                payment.tenantId &&
                payment.tenantId !== 0
              ) {
                constructPaymentObj();
                onRequestClose();
              }
            }}
          >
            {tenantId ? "Edit" : "Add"}
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
  paymentId = 0;
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

//add payment button modal
export const PaymentEditForm = (paymentObj) => {
  paymentId = paymentObj.id;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button id="UncontrolledTooltip" color="link" onClick={toggleModal}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>
      <UncontrolledTooltip placement="top" target="UncontrolledTooltip">
        Edit
      </UncontrolledTooltip>
    </div>
  );
};
