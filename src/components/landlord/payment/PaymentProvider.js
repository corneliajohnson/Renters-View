import React, { useState, createContext } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = (props) => {
  const [payments, setPayments] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [startPaymentDate, setStartPaymentDate] = useState(null);
  const [endPaymentDate, setEndPaymentDate] = useState(null);

  const getPayments = () => {
    return fetch("http://localhost:8088/payments?_expand=property")
      .then((res) => res.json())
      .then(setPayments);
  };

  const addPayment = (paymentObj) => {
    return fetch("http://localhost:8088/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentObj),
    }).then(getPayments);
  };

  const deletePayment = (id) => {
    return fetch(`http://localhost:8088/payments/${id}`, {
      method: "DELETE",
    }).then(getPayments);
  };
  const updatePayment = (payment) => {
    return fetch(`http://localhost:8088/payments/${payment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    }).then(getPayments);
  };

  const getPaymentById = (id) => {
    return fetch(`http://localhost:8088/payments/${id}`, {}).then((res) =>
      res.json()
    );
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        getPayments,
        addPayment,
        deletePayment,
        getPaymentById,
        updatePayment,
        setSearchTerms,
        searchTerms,
        startPaymentDate,
        endPaymentDate,
        setStartPaymentDate,
        setEndPaymentDate,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};
