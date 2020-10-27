import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { DateString } from "../date/DateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  CardLink,
  Form,
  Button,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
let propertyId = 0; //get the property selected

const Modal = ({ onRequestClose }) => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});
  const [tenants, setTenants] = useState([]);
  const [maintenanceRequests, setMaintenance] = useState([]);
  const [payments, setPayments] = useState([]);
  const [gain, setGain] = useState();
  const [loss, setLoss] = useState();

  //get info of property
  useEffect(() => {
    getPropertyById(propertyId).then((response) => {
      setProperty(response);
      setTenants(response.tenants);
      setMaintenance(response.maintenanceRequests);
      setPayments(response.payments);
    });
  }, []);

  //get gains and losses
  useEffect(() => {
    const amountTotalGain = payments.reduce(
      (acc, payment) => acc + parseFloat(payment.amount),
      0
    );

    const amountTotalLoss = maintenanceRequests.reduce(
      (acc, request) => acc + parseFloat(request.price),
      0
    );
    setGain(amountTotalGain.toFixed(2));
    setLoss(amountTotalLoss.toFixed(2));
  }, [payments, maintenanceRequests]);

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
            className="d-flex justify-content-end text-danger"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader>
            <h1 className="display-4">{property.street}</h1>
            <h2 className="display-4">
              {property.city}
              {property.state} {property.zip}
            </h2>
          </ModalHeader>

          <ModalBody>
            <Row>
              <Col>
                <img width="100%" src={property.image} alt="Card image cap" />
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
                    ? ` ${property.rentAmount} due on ${DateString(
                        property.paymentDay
                      )}`
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
                    ? ` ${DateString(property.leaseStartDate)}`
                    : " None"}
                </p>
                <p>
                  Lease End Date:{" "}
                  {property.leaseEndDate
                    ? ` ${DateString(property.leaseEndDate)}`
                    : " None"}
                </p>
              </Col>
            </Row>
            <h3 className="display-5">Gain/Loss</h3>
            <Row>
              <Col>
                <p>
                  <span style={{ fontWeight: "bold" }}>Gains</span>{" "}
                  <span className="text-success"> + {gain}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Loss</span>{" "}
                  <span className="text-danger"> - {loss}</span>
                </p>
              </Col>
              <Col>
                {gain - loss === 0 ? (
                  ""
                ) : gain - loss > 0 ? (
                  <h4 className="text-success">Profit of +{gain - loss}</h4>
                ) : (
                  <h4 className="text-danger">Loss of {gain - loss}</h4>
                )}
              </Col>
            </Row>
            <h3 className="display-5">Payments</h3>
            {payments.length === 0 ? <h5>None</h5> : ""}
            {payments.map((payment) => {
              return (
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {DateString(payment.date)}
                  </span>{" "}
                  {payment.firstName} {payment.lastName} ${payment.amount}
                </p>
              );
            })}
            <h3 className="display-5">Maintenance History</h3>
            {maintenanceRequests.length === 0 ? <h5>None</h5> : ""}
            {maintenanceRequests.map((request) => {
              return (
                <div>
                  <h5>{request.synopsis}</h5>
                  <p>
                    Status:{" "}
                    {request.complete
                      ? `Complete on ${DateString(request.dateComplete)}`
                      : "Pending"}{" "}
                    {request.price ? `cost $${request.price}` : "cost $0.00"}
                  </p>
                </div>
              );
            })}
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
    <div key={propertyId}>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <CardLink
        className="propertyCardLink"
        onClick={toggleModal}
        type="button"
      >
        <h4 id="UncontrolledTooltipExample">{propertyObj.street}</h4>
        <h5>
          {propertyObj.city} {propertyObj.state} {propertyObj.zip}
        </h5>
        <UncontrolledTooltip
          placement="right"
          target="UncontrolledTooltipExample"
        >
          More Info
        </UncontrolledTooltip>
      </CardLink>
    </div>
  );
};
