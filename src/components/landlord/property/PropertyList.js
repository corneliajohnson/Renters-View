import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { PropertyCard } from "./PropertyCard";
import "./Property.css";
import { PropertyFormEdit } from "./PropertyForm";
import { PropertyInfoModal } from "./PropertyInfoModal";
import { PropertyCardTenantInfo } from "./PropertyCardTenantInfo";
import { TenantContext } from "../tenants/TenantProvider";
import { Button } from "reactstrap";

export const PropertyList = () => {
  const { properties, getProperties, deleteProperty } = useContext(
    PropertyContext
  );
  const { getTenants } = useContext(TenantContext);

  const [filteredProperies, setFilterdProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    //only current landlord properties
    const subsetProperties = properties.filter(
      (property) => property.landlordId === parseInt(localStorage.landlord)
    );
    setFilterdProperties(subsetProperties);
  }, [properties]);

  return (
    <>
      <div className="container d-flex justify-content-around">
        <div className="properties row wrap m-5">
          {filteredProperies.map((property) => {
            return (
              <PropertyCard
                className="propertyCard"
                key={property.id}
                property={property}
                tenant={<PropertyCardTenantInfo id={property.id} />}
                titleLink={
                  <PropertyInfoModal
                    id={property.id}
                    street={property.street}
                    city={property.city}
                    state={property.state}
                    zip={property.zip}
                  />
                }
                deleteBtn={
                  <Button
                    outline
                    color="danger"
                    className="propertyBtn"
                    onClick={() => {
                      deleteProperty(property.id).then(getTenants);
                      //window.confirm('When you delete the property all assined tenants are erased. \n Are you sure you want to delete?')
                    }}
                  >
                    {" "}
                    Delete
                  </Button>
                }
                editBtn={<PropertyFormEdit id={property.id} />}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
