import React, { useState, createContext } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = (props) => {
  const [payments, setPayments] = useState([]);

  const getPayments = () => {
    return fetch("http://localhost:8088/payments")
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

  return (
    <PaymentContext.Provider
      value={{ payments, getPayments, addPayment, deletePayment }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};
