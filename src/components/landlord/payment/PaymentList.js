import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { PaymentCard } from "./PaymentCard";
import { Table } from "reactstrap";
import { PaymentEditForm, PaymentForm } from "./PaymentForm";
import { PaymentDelete } from "./PaymentDelete";
import { PaymentSearch } from "./PaymentSearch";

export const PaymentList = () => {
  const { getPayments, payments, searchTerms } = useContext(PaymentContext);
  const [total, setTotal] = useState();
  const [sortedPaymentDates, setSortedPaymentDates] = useState([]);
  const [filteredPayments, setFiltered] = useState([]);

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

    //sort dates
    const sortedPayDate = payments.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSortedPaymentDates(sortedPayDate);
  }, [payments]);

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching payments
      const subset = payments.filter(
        (payment) =>
          payment.firstName.toLowerCase().includes(searchTerms.toLowerCase()) ||
          payment.lastName.toLowerCase().includes(searchTerms.toLowerCase()) ||
          payment.property.street
            .toLowerCase()
            .includes(searchTerms.toLowerCase()) ||
          payment.property.city
            .toLowerCase()
            .includes(searchTerms.toLowerCase()) ||
          payment.property.state
            .toLowerCase()
            .includes(searchTerms.toLowerCase())
      );
      setFiltered(subset);
    } else {
      // If the search field is blank, display all payments
      setFiltered(payments);
    }
  }, [searchTerms, payments]);

  return (
    <div className="container">
      <h1 className="display-2 text-center m-5">Payments</h1>
      <PaymentForm />
      <PaymentSearch />
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
          {filteredPayments.map((payment) => {
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
