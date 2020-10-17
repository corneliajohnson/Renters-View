import React, { useState } from "react";
import { ListGroupItem, Input, Col, Row } from "reactstrap";

import { Link } from "react-router-dom";

export const MaintenanceCard = ({
  request,
  titleLink,
  deleteBtn,
  editBtn,
  checkbox,
}) => {
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
        </Col>
        <Col sm={1}>
          {" "}
          {editBtn}
          {deleteBtn}
        </Col>
        <Col sm={1}>{checkbox}</Col>
      </Row>
    </ListGroupItem>
  );
};
