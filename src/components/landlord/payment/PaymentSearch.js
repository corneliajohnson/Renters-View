import React, { useContext } from "react";
import { PaymentContext } from "./PaymentProvider";
import { Input } from "reactstrap";

export const PaymentSearch = () => {
  const { setSearchTerms } = useContext(PaymentContext);

  return (
    <>
      <Input
        type="text"
        className="input--wide mb-3 w-100 mx-auto"
        onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
        placeholder="Search for property or tenant... "
      />
    </>
  );
};
