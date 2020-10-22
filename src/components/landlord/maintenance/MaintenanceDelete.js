import React, { useContext } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { MaintenanceContext } from "./MaintenanceProvider";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MaintenanceDelete = (requestId) => {
  const { deleteMaintenanceRequest } = useContext(MaintenanceContext);

  //taost when a message is deleted
  const notify = () => {
    toast.error("Maintenance Request Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const alert = () => {
    confirmAlert({
      title: <h4>Delete Maintenance Request</h4>,
      message: (
        <>
          <p>Are you sure you sure?</p>
        </>
      ),
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            deleteMaintenanceRequest(requestId.id).then(() => notify()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <Button
      className="m-1 maintenanceBtn"
      outline
      color="danger"
      onClick={alert}
    >
      Delete
    </Button>
  );
};
