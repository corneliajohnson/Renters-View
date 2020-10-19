import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export const PropertyCard = ({
  property,
  deleteBtn,
  editBtn,
  tenants,
  titleLink,
  tenant,
}) => {
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
        {tenant}
        <Row>
          <Col>{editBtn}</Col>
          <Col>{deleteBtn}</Col>
        </Row>
      </Card>
    </div>
  );
};
