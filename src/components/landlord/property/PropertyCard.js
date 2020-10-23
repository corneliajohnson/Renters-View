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
        <img width="100%" src={property.image} alt="Card image cap" />
        {tenant}
        <CardText>
          <span style={{ fontWeight: "bold" }}>Rent:</span>{" "}
          {property.rentAmount ? property.rentAmount : "N/A"}
        </CardText>
        <Row>
          <Col className="text-left">{deleteBtn}</Col>
          <Col className="text-right">{editBtn}</Col>
        </Row>
      </Card>
    </div>
  );
};
