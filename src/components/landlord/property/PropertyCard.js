import React, { useState } from "react";
import { Card, CardText, CardBody, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

export const PropertyCard = ({ property, deleteBtn, editBtn }, props) => {
  return (
    <div>
      <Card className="m-2 pl-2 pr-2">
        <CardBody>
          <Link to={`/landlord/property/${property.id}`}>
            {property.street}
            {property.city} {property.state} {property.zip}
          </Link>
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
          <CardText>
            Rent Price:{" "}
            {property.rentAmount === null
              ? " Not Set"
              : `$ ${property.rentAmount}`}
          </CardText>
        </CardBody>
        <Row>
          <Col>{editBtn}</Col>
          <Col>{deleteBtn}</Col>
        </Row>
      </Card>
    </div>
  );
};
