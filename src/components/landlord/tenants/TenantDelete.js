import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "reactstrap";
import { TenantContext } from "./TenantProvider";
import { PropertyContext } from "../property/PropertyProvider";
import { TenantsChanged } from "../property/PropertyCardTenantInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TenantDelete = (tenantId) => {
  const { getProperties } = useContext(PropertyContext);
  const { deleteTenant, getTenantById } = useContext(TenantContext);

  const [tenant, setTenant] = useState({});

  //get individual tenant
  useEffect(() => {
    getTenantById(tenantId.id).then((response) => {
      setTenant(response);
    });
  }, []);

  //taost when a message is deleted
  const notify = () => {
    toast.error("Tenant Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  //show confirm modal
  const alert = () => {
    confirmAlert({
      title: "Delete Tenant",
      message: `Are you sure you want to delete ${tenant.firstName} ${tenant.lastName}`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            deleteTenant(tenantId.id)
              .then(getProperties) //change embeded property information
              .then(TenantsChanged()) //update property cards,
              .then(() => notify()), // show toast
        },
        {
          label: "No", //close modal
        },
      ],
    });
  };

  return (
    <Button outline color="danger" onClick={alert}>
      Delete
    </Button>
  );
};
