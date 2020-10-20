import React, { useContext, useEffect, useState } from "react";
import { LandlordContext, LandlordProvider } from "./LandlordProvider";
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
  const {
    getLandlordById,
    updateLandlord,
    landlords,
    getLandlords,
  } = useContext(LandlordContext);

  const [landlord, setLandlord] = useState({});

  useEffect(() => {
    getLandlords();
  }, []);

  //get info for currenant landlord
  useEffect(() => {
    const currentLandlord = parseInt(localStorage.landlord);
    getLandlordById(currentLandlord).then((res) => {
      setLandlord(res);
    });
  }, []);

  //get name of each input
  const handleControlledInputChange = (event) => {
    const newLandlord = { ...landlord };
    newLandlord[event.target.name] = event.target.value;
    setLandlord(newLandlord);
  };

  //edit current landlord obj
  const constructLandlord = () => {
    updateLandlord({
      id: parseInt(localStorage.landlord),
      firstName: landlord.firstName,
      lastName: landlord.lastName,
      email: landlord.email,
      phone: landlord.phone,
      image: false,
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
          <ModalHeader className="display-3">Edit Account</ModalHeader>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">
                  First Name<span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  defaultValue={landlord.firstName}
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">
                  Last Name<span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  defaultValue={landlord.lastName}
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
                defaultValue={landlord.email}
                onChange={handleControlledInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phone" sm={2}>
              Phone<span className="text-danger">*</span>
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="phone"
                defaultValue={landlord.phone}
                onChange={handleControlledInputChange}
              />
            </Col>
          </FormGroup>
        </Form>
        <div className="text-right">
          <Button
            outline
            color="success"
            onClick={(event) => {
              event.preventDefault();
              if (landlord.firstName && landlord.lastName && landlord.email) {
                constructLandlord();
                onRequestClose();
              }
            }}
          >
            Update
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

//edit property button modal
export const EditLandlordForm = () => {
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