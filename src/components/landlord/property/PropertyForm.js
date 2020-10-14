import React, { useContext, useEffect, useState, useRef } from "react";
import { PropertyContext } from "./PropertyProvider";
import { useHistory } from "react-router-dom";
import "./Property.css";

export const PropertyForm = () => {
  const { addProperty } = useContext(PropertyContext);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const street = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const zip = useRef(null);
  const tenantId = useRef(null);
  const leaseEndDate = useRef(null);
  const leaseStartDate = useRef(null);
  const rentAmount = useRef(null);
  const securityDesposit = useRef(null);
  const paymentDay = useRef(null);
  const lastPayementAmount = useRef(null);
  const leaseTerm = useRef(null);

  const constructProperty = () => {
    addProperty({
      street,
      city,
      state,
      zip,
      tenantId,
      leaseEndDate,
      leaseStartDate,
      rentAmount,
      securityDesposit,
      paymentDay,
      lastPayementAmount,
      leaseTerm,
      image: null,
      landlordId: 1,
    });
  };

  return <h1>modal btn</h1>;
};
