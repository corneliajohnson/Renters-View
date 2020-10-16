import React, { useState } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

import { Link } from "react-router-dom";

export const TenantCard = ({ tenant, deleteBtn }) => {
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
          <CardText>Address: {tenant.property.street}</CardText>
          <CardText>
            {tenant.property.city}
            {tenant.property.state} {tenant.property.zip}
          </CardText>
          {deleteBtn}
        </CardBody>
      </Card>
    </div>
  );
};
