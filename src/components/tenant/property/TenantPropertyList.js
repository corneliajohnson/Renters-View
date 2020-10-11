import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../../landlord/property/PropertyProvider";

export const TenantProperty = () => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});
  const [landlord, setLandlord] = useState({});

  useEffect(() => {
    getPropertyById(1).then((res) => {
      setProperty(res);
      setLandlord(res.landlord);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1>My Home</h1>

        <div className="row">
          <div className="four columns">
            <p>
              Landlord: {landlord.firstName} {landlord.lastName}
            </p>
            <p>Email: {landlord.email}</p>
            <p>Phone Number: {landlord.phone}</p>
          </div>
          <div className="eight columns">
            <h4 className="property__address">
              {property.street} {property.city} {property.state}
            </h4>
            <div className="property__image">
              <img src={require("../../../img/house.jpg")} />
            </div>
            <div className="property__tenant">Tenant: {property.tenantId}</div>
            <div className="property__rent">
              Rent Price: ${property.rentAmount}
            </div>
            <div className="property__moreInfor">
              <h5>More Info</h5>
              <p>Lease Begin: {property.leaseStartDate}</p>
              <p>Lease Ends: {property.leaseEndDate}</p>
              <p>Last Payment Amount: {property.lastPaymentAmount}</p>
              <p>Lease Term: {property.leaseTerm}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
