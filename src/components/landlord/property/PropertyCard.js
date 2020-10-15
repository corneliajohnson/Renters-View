import React, { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Collapse,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({ property, deleteBtn }, props) => {
  //For Modal Form
  const { buttonLabel } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{property.street} </CardTitle>
          <CardSubtitle>
            {property.city} {property.state} {property.zip}
          </CardSubtitle>
        </CardBody>
        <img
          width="100%"
          src={require("../../../img/house.jpg")}
          alt="Card image cap"
        />
        <CardBody>
          <CardText>Tenant: {property.tenantId}</CardText>
          <CardText>Rent Price: ${property.rentAmount}</CardText>
        </CardBody>
        <Row>
          <Col>{deleteBtn}</Col>
          <Col>
            <CardLink onClick={toggle}>
              {" "}
              {isOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
              {buttonLabel}
            </CardLink>
          </Col>
        </Row>

        <Collapse isOpen={isOpen}>
          <CardText>
            Lease Begin:
            {property.leaseStartDate ? ` ${property.leaseStartDate}` : " None"}
          </CardText>
          <CardText>
            Lease Ends:
            {property.leaseEndDate ? ` ${property.leaseEndDate}` : " None"}
          </CardText>
          <CardText>
            Lease Type:
            {property.leaseTerm ? ` ${property.leaseTerm}` : " None"}
          </CardText>
          <CardText>
            Last Payment:
            {property.lastpayment
              ? `${property.paymentAmount} ${property.leaseTerm}`
              : " None"}
          </CardText>
        </Collapse>
      </Card>
    </div>
  );
};
