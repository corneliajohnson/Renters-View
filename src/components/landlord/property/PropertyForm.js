import React, { useContext, useEffect, useState, useRef } from "react";
import { PropertyContext } from "./PropertyProvider";
import { useHistory } from "react-router-dom";
import "./Property.css";

export const PropertyForm = () => {
  const { addProperty } = useContext(PropertyContext);
  const history = useHistory();

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

  return (
    <section className="container">
      <form className="propertyForm">
        <h2 className="propertyForm__title">Add New Property</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="streetName">Street: </label>
            <input
              type="text"
              id="streetName"
              ref={street}
              required
              autoFocus
              className="form-control"
              placeholder="Street"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="cityName">City: </label>
            <input
              type="text"
              id="cityName"
              ref={city}
              required
              autoFocus
              className="form-control"
              placeholder="City"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="stateName">State: </label>
            <input
              type="text"
              id="stateName"
              ref={state}
              required
              autoFocus
              className="form-control"
              placeholder="State"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              type="number"
              id="zipcode"
              ref={zip}
              required
              autoFocus
              className="form-control"
              placeholder="Zip Code"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="tenant">Tenant: </label>
            <select
              defaultValue=""
              name=""
              ref={tenantId}
              id="tenantOption"
              className="form-control"
            >
              <option value="0">Select a Tenant</option>
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="leaseEndDtate">Lease Ends: </label>
            <input
              type="date"
              id="leaseEnd"
              ref={leaseEndDate}
              required
              autoFocus
              className="form-control"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="leaseStartDtate">Lease Starts: </label>
            <input
              type="date"
              id="leaseStart"
              ref={leaseStartDate}
              required
              autoFocus
              className="form-control"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="rentAmount">Rent Amount: </label>
            <input
              type="number"
              id="rentAmount"
              ref={rentAmount}
              required
              autoFocus
              className="form-control"
              placeholder="Rent Amount"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="securityDesposit">Security Desposit: </label>
            <input
              type="number"
              id="securityDeposit"
              ref={securityDesposit}
              required
              autoFocus
              className="form-control"
              placeholder="Security Deposit"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="paymentDay">Day Payements Due: </label>
            <input
              type="number"
              id="paymentDay"
              ref={paymentDay}
              required
              autoFocus
              className="form-control"
              placeholder="Payment Day"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="lastPayemntAmount">Last Payment Amount </label>
            <input
              type="number"
              id="lastPaymentAmount"
              ref={lastPayementAmount}
              required
              autoFocus
              className="form-control"
              placeholder="Last Payemnt Amount"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="leaseTerm">Lease Term: </label>
            <select
              defaultValue=""
              name=""
              ref={leaseTerm}
              id="leaseTermOption"
              className="form-control"
            >
              <option value="0">Select a Lease Term</option>
              <option value="1">Long Term</option>
              <option value="2">Month-to-Month</option>
              <option value="3">Subleasing</option>
              <option value="4">Air Bnb</option>
            </select>
          </div>
        </fieldset>
      </form>
    </section>
  );
};
