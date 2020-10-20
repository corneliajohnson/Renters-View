import React, { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "reactstrap";
import { TenantContext } from "./TenantProvider";
import { PropertyContext } from "../property/PropertyProvider";
import { TenantsChanged } from "../property/PropertyCardTenantInfo";

export const TenantDelete = (tenantId) => {
  const { getProperties } = useContext(PropertyContext);
  const { deleteTenant, getTenantById } = useContext(TenantContext);

  const [tenant, setTenant] = useState({});

  useEffect(() => {
    getTenantById(tenantId.id).then((response) => {
      setTenant(response);
    });
  }, []);

  const alert = () => {
    confirmAlert({
      title: "Delete Tenant",
      message: `Are you sure you want to delete ${tenant.firstName} ${tenant.lastName}`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            deleteTenant(tenantId.id)
              .then(getProperties)
              .then(TenantsChanged()), //update property cards,
        },
        {
          label: "No",
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
