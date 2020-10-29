import React, { useState, useContext } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { Button } from "reactstrap";
import { PaymentContext } from "../payment/PaymentProvider";

export const DatePicker = () => {
  const { setStartPaymentDate, setEndPaymentDate } = useContext(PaymentContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setStartPaymentDate(startDate);
    setEndPaymentDate(endDate);
  };

  return (
    <div>
      <DateRangePicker
        endDate={endDate}
        endDateId="endDate"
        focusedInput={focusedInput.focusedInput}
        isOutsideRange={() => null}
        onDatesChange={onDatesChange}
        onFocusChange={(focusedInput) => setFocusedInput({ focusedInput })}
        startDate={startDate}
        startDateId="startDate"
      />
      {/* set dates on button click
      <Button
        className="m-2"
        outline
        color="secondary"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setStartPaymentDate(startDate);
          setEndPaymentDate(endDate);
        }}
      >
        Search
      </Button> */}
    </div>
  );
};
