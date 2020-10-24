import React from "react";
import { ListGroupItem, Col, Row } from "reactstrap";
import { DateString } from "../date/DateString";

export const PaymentCard = ({ payment }) => {
  return (
    <tr>
      <th scope="row">{DateString(payment.date)}</th>
      <td>
        {payment.firstName} {payment.lastName}
      </td>
      <td>{payment.propertyId}</td>
      <td>{payment.amount}</td>
    </tr>
  );
};
