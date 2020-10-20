import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { MaintenanceContext } from "./MaintenanceProvider";
import { Button } from "reactstrap";

export const MaintenanceDelete = (requestId) => {
  const { deleteMaintenanceRequest } = useContext(MaintenanceContext);

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
          onClick: () => deleteMaintenanceRequest(requestId.id),
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
