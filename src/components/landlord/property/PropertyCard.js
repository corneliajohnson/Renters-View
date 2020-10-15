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
import { TransferWithinAStationTwoTone } from "@material-ui/icons";

export const PropertyCard = ({ property, deleteBtn, editBtn }, props) => {
  //For Modal Form
  const { buttonLabel } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Card className="m-2 pl-2 pr-2">
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
          <CardText>
            Tenant: {property.tenant.firstName} {property.tenant.lastName}
          </CardText>
          <CardText>Rent Price: ${property.rentAmount}</CardText>
        </CardBody>
        <Row>
          <Col>{editBtn}</Col>
          <Col>{deleteBtn}</Col>
          <Col className="text-right">
            <CardLink onClick={toggle} color="success">
              {" "}
              {isOpen ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} />
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
