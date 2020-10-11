import React, { useContext, useEffect } from "react";
import { PropertyContext } from "./PropertyProvider";
import { PropertyCard } from "./PropertyCard";
import { useHistory } from "react-router-dom";
import "./Property.css";

export const PropertyList = () => {
  const { properties, getProperties } = useContext(PropertyContext);

  const history = useHistory();

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      <h2>Properties</h2>
      <button
        className="button-primary"
        onClick={() => {
          history.push("/landlord/property");
        }}
      >
        Add Property
      </button>
      <div className="properties">
        {properties.map((property) => {
          return <PropertyCard key={property.id} property={property} />;
        })}
      </div>
    </>
  );
};
