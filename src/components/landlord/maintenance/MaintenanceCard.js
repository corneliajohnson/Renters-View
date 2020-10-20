import React, { useState } from "react";
import { ListGroupItem, Col, Row } from "reactstrap";
import "./Maintenance.css";

export const MaintenanceCard = ({ request, titleLink, deleteBtn, editBtn }) => {
  return (
    <ListGroupItem>
      <h4 className="mainentanceCardLink">{titleLink}</h4>
      <Row>
        <Col sm={10}>
          {" "}
          <p>
            {request.property.street} {request.property.city}{" "}
            {request.property.state} {request.property.zip}{" "}
          </p>
          <small>
            {request.complete ? (
              <p className="text-success">Complete {request.dateComplete}</p>
            ) : (
              <p className="text-danger">Pending</p>
            )}
          </small>
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
