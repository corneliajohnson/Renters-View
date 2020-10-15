import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { Delete } from "./DeleteProperty";
import { PropertyCard } from "./PropertyCard";
import "./Property.css";
import { PropertyFormEdit } from "./PropertyForm";

export const PropertyList = () => {
  const { properties, getProperties, deleteProperty } = useContext(
    PropertyContext
  );
  const [filteredProperies, setFilterdProperties] = useState([]);

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
                editBtn={<PropertyFormEdit id={property.id} />}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
