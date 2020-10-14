import React from "react";
import "./Property.css";

export const PropertyCard = ({ property }) => (
  <div className="propertyCard">
    <div>
      <img src={require("../../../img/house.jpg")} />
      <div>
        <p>
          {property.street} {property.city} {property.state}
        </p>
        <p variant="body2" color="textSecondary" component="p">
          Tenant: {property.tenantId}
        </p>
        <p>Rent Price: ${property.rentAmount}</p>
      </div>
    </div>
  </div>
);
