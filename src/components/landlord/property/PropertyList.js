import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { Delete } from "./DeleteProperty";
import { PropertyCard } from "./PropertyCard";
import { useHistory } from "react-router-dom";
import "./Property.css";

export const PropertyList = () => {
  const { properties, getProperties, deleteProperty } = useContext(
    PropertyContext
  );
  const [filteredProperies, setFilterdProperties] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    const subsetProperties = properties.filter(
      (property) => property.landlordId === parseInt(localStorage.landlord)
    );
    setFilterdProperties(subsetProperties);
  }, [properties]);

  return (
    <>
      <div className="container">
        <div className="properties row wrap">
          {filteredProperies.map((property) => {
            return (
              <PropertyCard
                key={property.id}
                property={property}
                deleteBtn={Delete(deleteProperty, property.id, "Delete")}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
