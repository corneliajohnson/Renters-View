import React, { useState } from "react";
import { ListGroupItem, Input, Col, Row } from "reactstrap";

export const MaintenanceCard = ({ request, titleLink, deleteBtn, editBtn }) => {
  return (
    <ListGroupItem>
      <h4>{titleLink}</h4>
      <Row>
        <Col sm={10}>
          {" "}
          <p>
            {request.property.street} {request.property.city}{" "}
            {request.property.state} {request.property.zip}{" "}
          </p>
          <small>{request.complete ? "Complete" : "InComplete"}</small>
        </Col>
        <Col sm={2}>
          <Row>
            {deleteBtn}
            {editBtn}
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
};
