import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../../landlord/property/PropertyProvider";

export const TenantProperty = () => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});

  useEffect(() => {
    getPropertyById(1).then((res) => {
      setProperty(res);
    });
  }, []);

  return (
    <>
      <h2>My Home</h2>
      <div className="property">
        <h4 className="property__address">
          {property.street} {property.city} {property.state}
        </h4>
        <div className="property__image">
          <img src={require("../../../img/house.jpg")} />
        </div>
        <div className="property__tenant">Tenant: {property.tenantId}</div>
        <div className="property__rent">Rent Price: ${property.rentAmount}</div>
        <div className="property__moreInfor">
          <h5>More Info</h5>
          <p>Lease Begin: {property.leaseStartDate}</p>
          <p>Lease Ends: {property.leaseEndDate}</p>
          <p>Last Payment Amount: {property.lastPaymentAmount}</p>
          <p>Lease Term: {property.leaseTerm}</p>
        </div>
      </div>
    </>
  );
};
