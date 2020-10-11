import React from "react";

export const PropertyCard = ({ property }) => (
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
);
