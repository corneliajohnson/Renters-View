//add and edit
import React, { useContext, useEffect, useState } from "react";
import "./PropertyForm.css";
import { PropertyContext } from "./PropertyProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  CardLink,
  Form,
} from "reactstrap";
let propertyId = 0;

const Modal = ({ onRequestClose }) => {
  const { getPropertyById, addProperty, updateProperty } = useContext(
    PropertyContext
  );

  const [property, setProperty] = useState({});

  useEffect(() => {
    //get id for property update
    if (propertyId) {
      getPropertyById(propertyId).then((property) => {
        setProperty(property);
      });
    }
  }, []);

  const handleControlledInputChange = (event) => {
    const newProperty = { ...property };
    newProperty[event.target.name] = event.target.value;
    setProperty(newProperty);
  };

  const constructPropertyObj = () => {
    //update property
    if (property.id) {
      updateProperty({
        id: property.id,
        street: property.street,
        city: property.city,
        state: property.state,
        zip: property.zip,
        leaseStartDate: property.leaseStartDate,
        leaseEndDate: property.leaseEndDate,
        rentAmount: parseInt(property.rentAmount),
        secuirtyDesposit: parseInt(property.secuirtyDesposit),
        paymentDay: property.paymentDay,
        lastPaymentAmount: parseInt(property.lastPaymentAmount),
        leaseTerm: property.leaseTerm,
        image: null,
        landlordId: parseInt(localStorage.landlord),
      });
    } else {
      //add property
      addProperty({
        street: property.street,
        city: property.city,
        state: property.state,
        zip: property.zip,
        leaseStartDate: property.leaseStartDate,
        leaseEndDate: property.leaseEndDate,
        rentAmount: parseInt(property.rentAmount),
        secuirtyDesposit: parseInt(property.secuirtyDesposit),
        paymentDay: property.paymentDay,
        lastPaymentAmount: parseInt(property.lastPaymentAmount),
        leaseTerm: property.leaseTerm,
        image: null,
        landlordId: parseInt(localStorage.landlord),
      });
    }
    propertyId = 0;
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
            <FontAwesomeIcon className="text-danger" icon={faTimes} />
          </CardLink>
          <ModalHeader>
            {property.id ? "Edit Property" : "Add A New Property"}
          </ModalHeader>
          <Form>
            <ModalBody>
              <FormGroup>
                <Label for="address">
                  Address <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="street"
                  placeholder="1234 Main St"
                  onChange={handleControlledInputChange}
                  value={property.street}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter street",
                    },
                    minLength: {
                      value: 6,
                      errorMessage: "Your name must at least 6 characters",
                    },
                  }}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">
                      City <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="city"
                      onChange={handleControlledInputChange}
                      defaultValue={property.city}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Please enter city",
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">
                      State <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="state"
                      id="exampleState"
                      onChange={handleControlledInputChange}
                      defaultValue={property.state}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Please enter state",
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="zip">
                      Zip <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="number"
                      name="zip"
                      onChange={handleControlledInputChange}
                      defaultValue={property.zip}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Please enter zip code",
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="leaseStartDate">Lease Begin</Label>
                      <Input
                        type="date"
                        name="leaseStartDate"
                        onChange={handleControlledInputChange}
                        defaultValue={property.leaseStartDate}
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
                        defaultValue={property.leaseEndDate}
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
                        defaultValue={property.rentAmount}
                        required
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
                        defaultValue={property.secuirtyDesposit}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="paymentDay">Next Due Date</Label>
                      <Input
                        type="date"
                        name="paymentDay"
                        onChange={handleControlledInputChange}
                        defaultValue={property.paymentDay}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="lastPaymentAmount">
                        Amount of Last Payment Made
                      </Label>
                      <Input
                        type="number"
                        name="lastPaymentAmount"
                        onChange={handleControlledInputChange}
                        defaultValue={property.lastPaymentAmount}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="leaseTerm">Lease Term</Label>
                    <Input
                      type="select"
                      name="leaseTerm"
                      onChange={handleControlledInputChange}
                      value={property.leaseTerm}
                      required
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
              <p className="text-danger">
                All fields with * are required to submit form.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                outline
                color="success"
                onClick={(event) => {
                  event.preventDefault();
                  if (
                    //only submit if the following is definded
                    property.street &&
                    property.city &&
                    property.state &&
                    property.zip
                  ) {
                    constructPropertyObj(); //add or edit
                    onRequestClose(); // close form after submit
                  }
                }}
              >
                {property.id ? "Update" : "Add"}
              </Button>{" "}
              <Button
                type="button"
                outline
                color="dark"
                onClick={onRequestClose}
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
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

  propertyId = 0;

  return (
    <div className="container text-center">
      <h1 className="display-2 m-5">My Properties</h1>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button outline color="secondary" onClick={toggleModal} type="button">
        Add New Property
      </Button>
    </div>
  );
};

export const PropertyFormEdit = (propertyObjId) => {
  propertyId = propertyObjId.id;
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <main>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button
        outline
        color="secondary"
        className="propertyBtn"
        onClick={toggleModal}
        type="button"
      >
        Edit
      </Button>
    </main>
  );
};
