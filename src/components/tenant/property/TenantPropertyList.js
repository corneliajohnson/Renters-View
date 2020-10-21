import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "../../landlord/tenants/TenantProvider";
import { PropertyContext } from "../../landlord/property/PropertyProvider";
import { Row, Col } from "reactstrap";

export const TenantProperty = () => {
  const { getTenantById } = useContext(TenantContext);
  const { getPropertyById } = useContext(PropertyContext);

  const [tenant, setTenant] = useState({});
  const [property, setProperty] = useState({});
  const [landlord, setLandlord] = useState({});
  const [propertyMaintenance, setPropertMaintenance] = useState([]);

  useEffect(() => {
    const currentTenant = parseInt(localStorage.tenant);
    getTenantById(currentTenant).then((response) => {
      setTenant(response);
      setProperty(response.property);
      setLandlord(response.landlord);
    });
  }, []);

  useEffect(() => {
    if (tenant.propertyId) {
      getPropertyById(tenant.propertyId).then((response) => {
        setPropertMaintenance(response.maintenanceRequests);
      });
    }
  }, [tenant.propertyId]);

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="display-2">My Home</h1>
          <h4 className="property__address text-center">
            {property.street} {property.city} {property.state}
          </h4>
          <div className="property__image">
            <img src={require("../../../img/house.jpg")} />
          </div>
        </div>

        <Row className="m-5">
          <Col>
            <h3>Tenant</h3>
            <div className="property__tenant">
              <p>
                {tenant.firstName} {tenant.lastName}
              </p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
            </div>
          </Col>
          <Col>
            <h3>Landlord</h3>
            <p>
              {landlord.firstName} {landlord.lastName}
            </p>
            <p>Email: {landlord.email}</p>
            <p>Phone Number: {landlord.phone}</p>
          </Col>
        </Row>
        <Row className="m-5">
          <Col>
            <div className="property__moreInfor">
              <h3>Property Info</h3>
              Rent Price: ${property.rentAmount}
              <p>Lease Begin: {property.leaseStartDate}</p>
              <p>Lease Ends: {property.leaseEndDate}</p>
              <p>Last Payment Amount: {property.lastPaymentAmount}</p>
              <p>Lease Term: {property.leaseTerm}</p>
            </div>
          </Col>
          <Col>
            <div className="property_maintenatce">
              <h3>Maintenance</h3>
              {propertyMaintenance.map((request) => {
                return request.synopsis;
              })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
