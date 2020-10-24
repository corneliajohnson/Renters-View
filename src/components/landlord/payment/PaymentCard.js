import React from "react";
import { DateString } from "../date/DateString";
import { Col, Row } from "reactstrap";

export const PaymentCard = ({ payment, deleteBtn, editBtn }) => {
  return (
    <tr>
      <th scope="row">{DateString(payment.date)}</th>
      <td>
        {payment.firstName} {payment.lastName}
      </td>
      <td>
        {payment.property.street} {payment.property.city}{" "}
        {payment.property.state}
      </td>
      <td>{payment.amount}</td>
      <td>
        <Row>
          <Col sm={4}>{deleteBtn}</Col>
          <Col sm={2}>{editBtn}</Col>
        </Row>
      </td>
    </tr>
  );
};
