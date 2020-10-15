import React from "react";
import { Button } from "reactstrap";

export const Delete = (deleteFetch, deletedId, btnText) => {
  return (
    <Button
      color="danger"
      onClick={() => {
        deleteFetch(deletedId);
      }}
    >
      {" "}
      {btnText}
    </Button>
  );
};
