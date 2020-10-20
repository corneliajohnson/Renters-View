import React, { useContext, useEffect, useState } from "react";
import {
  CardLink,
  Form,
  Button,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import { PropertyContext } from "./PropertyProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
let propertyId = 0; //get the property selected

const Modal = ({ onRequestClose }) => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});
  const [tenants, setTenants] = useState([]);

  //get info of property
  useEffect(() => {
    getPropertyById(propertyId).then((response) => {
      setProperty(response);
      setTenants(response.tenants);
    });
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
        <Form>
          <CardLink
            className="d-flex justify-content-end"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader>
            <h1 className="display-3">{property.street}</h1>
            <h2 className="display-4">
              {property.city}
              {property.state} {property.zip}
            </h2>
          </ModalHeader>

          <ModalBody>
            <img
              width="50%"
              src={require("../../../img/house.jpg")}
              alt="Card image cap"
            />
            <Row>
              <Col>
                <h3 className="display-5">Current Tenant(s)</h3>
                {tenants.map((tenant) => {
                  return (
                    <>
                      <div key={tenant.id}>
                        <h5>
                          Tenant: {tenant.firstName} {tenant.lastName}
                        </h5>
                        <p>Email: {tenant.email}</p>
                        <p>Phone: {tenant.phone}</p>
                      </div>
                    </>
                  );
                })}
              </Col>
              <Col>
                <h3 className="display-5">Payment Information</h3>
                <p>
                  Lease Type:{" "}
                  {property.leaseTerm ? ` ${property.leaseTerm}` : " None"}
                </p>
                <p>
                  Rent amount:{" "}
                  {property.rentAmount
                    ? ` ${property.rentAmount} due on ${property.paymentDay} in the Amount of $${property.lastPaymentAmount}`
                    : " None"}
                </p>
                <p>
                  Secuirty Desposit:{" "}
                  {property.secuirtyDesposit
                    ? ` ${property.secuirtyDesposit}`
                    : " None"}
                </p>
                <p>
                  Lease State Date:{" "}
                  {property.leaseStartDate
                    ? ` ${property.leaseStartDate}`
                    : " None"}
                </p>
                <p>
                  Lease End Date:{" "}
                  {property.leaseEndDate
                    ? ` ${property.leaseEndDate}`
                    : " None"}
                </p>
              </Col>
            </Row>
            <h3 className="display-5">Maintenance History</h3>
          </ModalBody>
        </Form>
        <Button
          outline
          color="secondary"
          type="button"
          onClick={onRequestClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

//liink to open property info modal
export const PropertyInfoModal = (propertyObj) => {
  propertyId = propertyObj.id;
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };
  return (
    <div>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <CardLink
        className="propertyCardLink"
        onClick={toggleModal}
        type="button"
      >
        <h4>{propertyObj.street}</h4>
        <h5>
          {propertyObj.city} {propertyObj.state} {propertyObj.zip}
        </h5>
      </CardLink>
    </div>
  );
};
