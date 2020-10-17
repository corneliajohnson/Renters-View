import React, { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { Link } from "react-router-dom";

export const PropertyCard = (
  { property, deleteBtn, editBtn, titleLink },
  props
) => {
  return (
    <div>
      <Card className="m-2">
        <CardBody>
          <CardTitle>{titleLink}</CardTitle>
        </CardBody>
        <img
          width="100%"
          src={require("../../../img/house.jpg")}
          alt="Card image cap"
        />
        <CardBody>
          <CardText>
            Head of Household: {property.tenant.firstName}{" "}
            {property.tenant.lastName}
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
