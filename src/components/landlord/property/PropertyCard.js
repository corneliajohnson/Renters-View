import React from "react";
import { Card, CardBody, Row, Col, CardTitle, CardText } from "reactstrap";

export const PropertyCard = ({
  property,
  deleteBtn,
  editBtn,
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
        <CardText>
          Rent: {property.rentAmount ? property.rentAmount : "N/A"}
        </CardText>
        <Row>
          <Col className="text-left">{editBtn}</Col>
          <Col className="text-right">{deleteBtn}</Col>
        </Row>
      </Card>
    </div>
  );
};
