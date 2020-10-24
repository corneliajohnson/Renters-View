import React, { useContext } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, UncontrolledTooltip } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PaymentContext } from "./PaymentProvider";

export const PaymentDelete = (paymentId) => {
  const { deletePayment } = useContext(PaymentContext);
  //taost when a payment is deleted
  const notify = () => {
    toast.error("Payment Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const alert = () => {
    confirmAlert({
      title: "Delete Payment",
      message: `Are you sure you want to delete this payment?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePayment(paymentId.id).then(() => notify()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <Button
        id="UncontrolledTooltip"
        color="link"
        style={{ color: "red" }}
        onClick={alert}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <UncontrolledTooltip placement="top" target="UncontrolledTooltip">
        Delete
      </UncontrolledTooltip>
    </>
  );
};
