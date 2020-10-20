import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { PropertyContext } from "../property/PropertyProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TenantsChanged } from "../property/PropertyCardTenantInfo";
import "./Tenant.css";

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
let tenantId = 0; //tenant card selected

const Modal = ({ onRequestClose }) => {
  const { getProperties, properties } = useContext(PropertyContext);
  const { addTenant, getTenantById, updateTenant } = useContext(TenantContext);

  const [tenant, setTenant] = useState({});

  //for property dropdown
  useEffect(() => {
    getProperties();
  }, []);

  //get tenants for edit
  useEffect(() => {
    if (tenantId) {
      getTenantById(tenantId).then((tenant) => {
        setTenant(tenant);
      });
    }
  }, []);

  //get name of each input
  const handleControlledInputChange = (event) => {
    const newTenant = { ...tenant };
    newTenant[event.target.name] = event.target.value;
    setTenant(newTenant);
  };

  //add or edit tenant in database
  const constructTenantObj = () => {
    if (tenant.id) {
      updateTenant({
        id: tenant.id,
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        phone: tenant.phone,
        propertyId: parseInt(tenant.propertyId),
        landlordId: parseInt(localStorage.landlord),
      }).then(getProperties);
    } else {
      addTenant({
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        phone: tenant.phone,
        propertyId: parseInt(tenant.propertyId),
        landlordId: parseInt(localStorage.landlord),
      }).then(getProperties);
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
        <Form className="text-left">
          <CardLink
            className="d-flex justify-content-end text-danger"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader className="display-3">
            {tenant.id ? "Edit Tenant" : "Add New Tenant"}
          </ModalHeader>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">
                  First Name<span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  defaultValue={tenant.firstName}
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">
                  Last Name<span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  defaultValue={tenant.lastName}
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email<span className="text-danger">*</span>
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                defaultValue={tenant.email}
                onChange={handleControlledInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              Phone Number
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="phone"
                defaultValue={tenant.phone}
                onChange={handleControlledInputChange}
                placeholder="123-456-7890"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="ProopertyId" sm={2}>
              Address<span className="text-danger">*</span>
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="propertyId"
                value={tenant.propertyId}
                onChange={handleControlledInputChange}
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
          <p className="text-danger">
            All fields with * are required to submit form.
          </p>
        </Form>
        <div className="text-right">
          <Button
            outline
            color="success"
            onClick={(event) => {
              event.preventDefault();
              if (
                tenant.firstName &&
                tenant.lastName &&
                tenant.email &&
                tenant.propertyId &&
                tenant.propertyId !== "0"
              ) {
                constructTenantObj();
                onRequestClose();
                TenantsChanged(); //update property cards
              }
            }}
          >
            {tenant.id ? "Update" : "Add"}
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

//add property button modal
export const TenantForm = () => {
  tenantId = 0;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div className="container text-center">
      <h1 id="tenants" className="display-2 m-5">
        My Tenants
      </h1>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button onClick={toggleModal} outline color="secondary" type="button">
        Add New Tenant
      </Button>
    </div>
  );
};

//edit property button modal
export const EditTenantForm = (tenantObjId) => {
  tenantId = tenantObjId.id;
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
        className="tenantCardBtn"
        onClick={toggleModal}
        type="button"
      >
        Edit
      </Button>
    </main>
  );
};
