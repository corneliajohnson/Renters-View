import React, { useContext, useEffect, useState } from "react";
import { PaymentContext } from "./PaymentProvider";
import { PaymentCard } from "./PaymentCard";
import { Table } from "reactstrap";
import { PaymentEditForm, PaymentForm } from "./PaymentForm";
import { PaymentDelete } from "./PaymentDelete";
import { PaymentSearch } from "./PaymentSearch";
import { Row, Col } from "reactstrap";
import { PaginationPages } from "../paginantion/PaginationPages";

export const PaymentList = () => {
  const { getPayments, payments, searchTerms } = useContext(PaymentContext);
  const [total, setTotal] = useState();
  const [sortedPaymentDates, setSortedPaymentDates] = useState([]);
  const [filteredPayments, setFiltered] = useState([]);
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(8);

  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    //sort dates
    const sortedPayDate = payments.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedPaymentDates(sortedPayDate);
  }, [payments]);

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching payments
      const subset = sortedPaymentDates.filter(
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
  }, [searchTerms, payments, sortedPaymentDates]);

  //for payment total based on search terms
  useEffect(() => {
    //get the total
    if (searchTerms === "") {
      const amountTotalAll = payments.reduce(
        (acc, payment) => acc + parseFloat(payment.amount),
        0
      );
      setTotal(amountTotalAll.toFixed(2));
    } else {
      //get total of showing search
      const amountTotalAll = filteredPayments.reduce(
        (acc, payment) => acc + parseFloat(payment.amount),
        0
      );
      setTotal(amountTotalAll.toFixed(2));
    }
  }, [filteredPayments]);

  //Get current payments for paginantion
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  //change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mb-5" style={{ width: "100vh" }}>
      <h1 className="display-2 text-center mt-5 mb-5">Payments</h1>
      <PaymentForm />
      <Row className="mb-3">
        <Col>
          {" "}
          <PaymentSearch />
        </Col>
      </Row>
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
          {currentPayments.map((payment) => {
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
      <PaginationPages
        postsPerPage={paymentsPerPage}
        totalPosts={filteredPayments.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
