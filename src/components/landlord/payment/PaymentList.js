import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { PaymentCard } from "./PaymentCard";
import { Table } from "reactstrap";
import { PaymentEditForm, PaymentForm } from "./PaymentForm";
import { PaymentDelete } from "./PaymentDelete";

export const PaymentList = () => {
  const { getPayments, payments } = useContext(PaymentContext);
  const [total, setTotal] = useState();

  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    //get the total
    const amountTotal = payments.reduce(
      (acc, payment) => acc + parseFloat(payment.amount),
      0
    );
    setTotal(amountTotal.toFixed(2));
  }, [payments]);

  return (
    <div className="container">
      <h1 className="display-2 text-center m-5">Payments</h1>
      <PaymentForm />
      <Table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tenant</th>
            <th>Address</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            return (
              <PaymentCard
                key={payment.id}
                payment={payment}
                deleteBtn={<PaymentDelete id={payment.id} />}
                editBtn={<PaymentEditForm id={payment.id} />}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Total</th>
            <th>{total}</th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
