import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { PaymentCard } from "./PaymentCard";
import { Table } from "reactstrap";

export const PaymentList = () => {
  const { getPayments, payments } = useContext(PaymentContext);

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="container">
      <h1 className="display-2 text-center m-5">Payments</h1>
      <Table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tenant</th>
            <th>Address</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            return <PaymentCard key={payment.id} payment={payment} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};
