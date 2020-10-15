import React, { useContext, useEffect, useState, useRef } from "react";
import "./PropertyForm.css";
import { PropertyContext } from "./PropertyProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  CardLink,
} from "reactstrap";

const Modal = ({ onRequestClose }) => {
  const { getPropertyById, addProperty } = useContext(PropertyContext);
  const { tenants, getTenants } = useContext(TenantContext);

  useEffect(() => {
    getTenants();
  }, []);

  const [property, setProperty] = useState({});

  const handleControlledInputChange = (event) => {
    const newProperty = { ...property };
    newProperty[event.target.name] = event.target.value;
    setProperty(newProperty);
  };

  const constructPropertyObj = () => {
    addProperty({
      street: property.street,
      city: property.city,
      state: property.state,
      zip: property.zip,
      tenantId: parseInt(property.tenantId),
      leaseStartDate: property.leaseStartDate,
      leaseEndDate: property.leaseEndDate,
      rentAmount: property.rentAmount,
      secuirtyDesposit: property.secuirtyDesposit,
      paymentDay: property.secuirtyDesposit,
      lastPaymentAmount: property.lastPaymentAmount,
      leaseTerm: property.leaseStartDate,
      image: null,
      landlordId: parseInt(localStorage.landlord),
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
        <div>
          <CardLink
            className="d-flex justify-content-end"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader>Add A New Property</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  required
                  type="text"
                  name="street"
                  placeholder="1234 Main St"
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      required
                      type="text"
                      name="city"
                      onChange={handleControlledInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      required
                      type="text"
                      name="state"
                      id="exampleState"
                      onChange={handleControlledInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input
                      required
                      type="text"
                      name="zip"
                      onChange={handleControlledInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleSelect">Tenant</Label>
                <Input
                  type="select"
                  name="tenantId"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">None</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.firstName} {tenant.lastName}
                    </option>
                  ))}
                </Input>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="leaseStartDate">Lease Begin</Label>
                      <Input
                        type="date"
                        name="leaseStartDate"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="leaseEndDate">Lease Ends</Label>
                      <Input
                        type="date"
                        name="leaseEndDate"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="rentAmount">Rent</Label>
                      <Input
                        required
                        type="text"
                        name="rentAmount"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="secuirtyDesposit">Secuirty Desposit</Label>
                      <Input
                        type="text"
                        name="secuirtyDesposit"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="paymentDay">Monthly Due Date</Label>
                      <Input
                        type="number"
                        name="paymentDay"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="lastPaymentAmount">Last Payment Made</Label>
                      <Input
                        type="date"
                        name="lastPaymentAmount"
                        onChange={handleControlledInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="leaseTerm">Lease Term</Label>
                    <Input
                      type="select"
                      name="leaseTerm"
                      onChange={handleControlledInputChange}
                    >
                      <option value="Vacant">Vacant</option>
                      <option value="12 Month">12 Month</option>
                      <option value="Month to Month">Month to Month</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Air BnB">Air BnB</option>
                      <option value="Under Repair">Under Repair</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                constructPropertyObj();
              }}
            >
              Add
            </Button>{" "}
            <Button type="button" onClick={onRequestClose}>
              Close
            </Button>
          </ModalFooter>
        </div>
      </div>
    </div>
  );
};

export const PropertyForm = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <main>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button onClick={toggleModal} type="button">
        Add New Property
      </Button>
    </main>
  );
};

export const PropertyFormEdit = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <main>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button onClick={toggleModal} type="button">
        Edit
      </Button>
    </main>
  );
};
