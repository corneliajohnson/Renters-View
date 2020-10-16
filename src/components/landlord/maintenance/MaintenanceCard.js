import React, { useState } from "react";
import { ListGroupItem, Input, Col, Row } from "reactstrap";

import { Link } from "react-router-dom";

export const MaintenanceCard = ({ request }) => {
  return (
    <ListGroupItem>
      <h4>{request.synopsis}</h4>
      <Row>
        <Col sm={11}>
          {" "}
          <p>
            {request.property.street} {request.property.city}{" "}
            {request.property.state} {request.property.zip}{" "}
          </p>
        </Col>
        <Col sm={1}>
          <Input type="checkbox" />
        </Col>
      </Row>
    </ListGroupItem>
  );
};
