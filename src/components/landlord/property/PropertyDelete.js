import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "reactstrap";
import { TenantContext } from "../tenants/TenantProvider";
import { PropertyContext } from "./PropertyProvider";
import "./Property.css";

export const PropertyDelete = (propertyId) => {
  const { deleteProperty, getPropertyById } = useContext(PropertyContext);
  const { getTenants } = useContext(TenantContext);

  const [property, setProperty] = useState({});

  useEffect(() => {
    getPropertyById(propertyId.id).then((response) => {
      setProperty(response);
    });
  }, []);

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
          label: "Yes",
          onClick: () => deleteProperty(propertyId.id).then(getTenants),
        },
        {
          label: "No",
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