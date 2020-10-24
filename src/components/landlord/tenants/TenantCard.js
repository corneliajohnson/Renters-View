import React from "react";
import { Card, CardText, CardBody, CardTitle, Row, Col } from "reactstrap";

export const TenantCard = ({ tenant, deleteBtn, editBtn, paymentBtn }) => {
  return (
    <div>
      <Card className="m-2">
        <CardBody>
          <CardTitle>
            <Row>
              <Col sm={8}>
                <h4>
                  {tenant.firstName} {tenant.lastName}
                </h4>
              </Col>
              <Col sm={4}>{paymentBtn}</Col>
            </Row>
          </CardTitle>
          <CardText>
            <span style={{ fontWeight: "bold" }}>Phone Number:</span>{" "}
            {tenant.phone ? tenant.phone : "N/A"}
          </CardText>
          <CardText>
            <span style={{ fontWeight: "bold" }}>Email:</span> {tenant.email}
          </CardText>
          <span style={{ fontWeight: "bold" }}>Address:</span>
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
