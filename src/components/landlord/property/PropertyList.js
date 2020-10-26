import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { PropertyCard } from "./PropertyCard";
import "./Property.css";
import { PropertyFormEdit } from "./PropertyForm";
import { PropertyInfoModal } from "./PropertyInfoModal";
import { PropertyCardTenantInfo } from "./PropertyCardTenantInfo";
import { PropertyDelete } from "./PropertyDelete";
import { Row, Col } from "reactstrap";

export const PropertyList = () => {
  const { properties, getProperties } = useContext(PropertyContext);

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
      <Row>
        <div className="container d-flex justify-content-around">
          <div className="properties row wrap m-5">
            {filteredProperies.map((property) => {
              return (
                <Col key={property.id} sm={12} lg={6} xl={4}>
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
                    deleteBtn={<PropertyDelete id={property.id} />}
                    editBtn={<PropertyFormEdit id={property.id} />}
                  />
                </Col>
              );
            })}
          </div>
        </div>
      </Row>
    </>
  );
};
