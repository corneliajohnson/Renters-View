import React, { useContext } from "react";
import { PaymentContext } from "./PaymentProvider";

export const PaymentSearch = () => {
  const { setSearchTerms } = useContext(PaymentContext);

  return (
    <>
      <input
        type="text"
        className="input--wide"
        onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
        placeholder="Search for property or tenant... "
      />
    </>
  );
};
