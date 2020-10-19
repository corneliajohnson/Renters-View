import React from "react";
import { Card, CardText, CardBody, CardTitle, Row, Col } from "reactstrap";

export const TenantCard = ({ tenant, deleteBtn, editBtn }) => {
  return (
    <div>
      <Card className="m-2">
        <CardBody>
          <CardTitle>
            <h4>
              {tenant.firstName} {tenant.lastName}
            </h4>
          </CardTitle>
          <CardText>
            Phone Number: {tenant.phone ? tenant.phone : "N/A"}
          </CardText>
          <CardText>Email: {tenant.email}</CardText>
          Address:
          <CardText>
            {tenant.property.street} {"\n"}
            {tenant.property.city} {tenant.property.state}
          </CardText>
          <Row>
            <Col>{deleteBtn}</Col> <Col>{editBtn}</Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
