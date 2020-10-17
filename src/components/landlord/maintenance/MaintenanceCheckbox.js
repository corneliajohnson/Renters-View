import React, { useState, useContext, useEffect } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { Input } from "reactstrap";

import { Link } from "react-router-dom";

export const MaintenanceCheckbox = (maintenanceObj) => {
  const [isChecked, setIsChecked] = useState(false);
  const [request, setRequest] = useState({});

  const { getMaintenanceRequestById, updateMaintenaceRequest } = useContext(
    MaintenanceContext
  );

  useEffect(() => {
    getMaintenanceRequestById(maintenanceObj.id).then((request) => {
      setRequest(request);

      updateMaintenaceRequest({
        id: request.id,
        propertyId: request.propertyId,
        synopsis: request.synopsis,
        price: request.price,
        contractor: request.contractor,
        complete: isChecked,
        note: request.note,
        dateComplete: request.dateComplete,
        dateAdded: request.dateAdded,
      });
    });
  }, [isChecked]);

  return (
    <>
      <Input
        type="checkbox"
        name="complete"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </>
  );
};
