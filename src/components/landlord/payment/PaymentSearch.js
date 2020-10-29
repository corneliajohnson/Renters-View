import React, { useContext } from "react";
import { PaymentContext } from "./PaymentProvider";
import { Input } from "reactstrap";

//set search terms based on key stroke
export const PaymentSearch = () => {
  const { setSearchTerms } = useContext(PaymentContext);

  return (
    <>
      <Input
        type="text"
        className="input--wide mb-3 w-75 mx-auto"
        onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
        placeholder="Search for property, tenant, date or amount... "
      />
    </>
  );
};
