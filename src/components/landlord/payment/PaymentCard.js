import React from "react";
import { DateString } from "../date/DateString";

export const PaymentCard = ({ payment, deleteBtn }) => {
  return (
    <tr>
      <th scope="row">{DateString(payment.date)}</th>
      <td>
        {payment.firstName} {payment.lastName}
      </td>
      <td>{payment.propertyId}</td>
      <td>{payment.amount}</td>
      <td>{deleteBtn}</td>
    </tr>
  );
};
