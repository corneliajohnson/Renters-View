import React, { useState, useContext, useEffect } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { Input } from "reactstrap";

export const MaintenanceCheckbox = (maintenanceObj) => {
  const [isChecked, setIsChecked] = useState(false);

  const { getMaintenanceRequestById, updateMaintenaceRequest } = useContext(
    MaintenanceContext
  );

  useEffect(() => {
    getMaintenanceRequestById(maintenanceObj.id).then((request) => {
      updateMaintenaceRequest({
        id: request.id,
        propertyId: request.propertyId,
        synopsis: request.synopsis,
        price: request.price,
        contractor: request.contractor,
        complete: isChecked,
        note: request.note,
        dateComplete: isChecked ? request.dateComplete : "",
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
