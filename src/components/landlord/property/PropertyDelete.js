import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "reactstrap";
import { TenantContext } from "../tenants/TenantProvider";
import { PropertyContext } from "./PropertyProvider";
import "./Property.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PropertyDelete = (propertyId) => {
  const { deleteProperty, getPropertyById } = useContext(PropertyContext);
  const { getTenants } = useContext(TenantContext);

  const [property, setProperty] = useState({});

  //get individal property
  useEffect(() => {
    getPropertyById(propertyId.id).then((response) => {
      setProperty(response);
    });
  }, []);

  //taost when a property is deleted
  const notify = () => {
    toast.error("Property Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  //show confirm modal
  const alert = () => {
    confirmAlert({
      title: "Delete Property",
      message: (
        <>
          <p>
            Are you sure you want to delete {property.street}, {property.city},{" "}
            {property.state}
          </p>{" "}
          <p className="text-danger">Tenants of property will be deleted</p>
        </>
      ),
      buttons: [
        {
          label: "Yes", //delete property, tenants assigned to property and show toast
          onClick: () =>
            deleteProperty(propertyId.id)
              .then(getTenants)
              .then(() => notify()),
        },
        {
          label: "No", //close modal
        },
      ],
    });
  };

  return (
    <Button className="propertyBtn" outline color="danger" onClick={alert}>
      Delete
    </Button>
  );
};
