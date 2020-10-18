import React, { useState } from "react";
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

          <CardText>Phone Number: {tenant.phone}</CardText>
          <CardText>Email: {tenant.email}</CardText>
          {tenant.property ? (
            <CardText>{tenant.property.street}</CardText>
          ) : (
            `None`
          )}
          <Row>
            <Col>{deleteBtn}</Col> <Col>{editBtn}</Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
