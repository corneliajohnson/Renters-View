import React from "react";
import { CardLink } from "reactstrap";

export const Delete = (deleteFetch, deletedId, btnText) => {
  return (
    <CardLink
      onClick={() => {
        deleteFetch(deletedId);
      }}
    >
      {" "}
      {btnText}
    </CardLink>
  );
};
