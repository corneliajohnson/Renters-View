import React, { useContext, useEffect, useState } from "react";
import { LandlordContext } from "./LandlordProvider";
import { Row, Col } from "reactstrap";

export const AccountView = () => {
  const { getLandlordById } = useContext(LandlordContext);

  const [landlord, setLandlord] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const landlordId = parseInt(localStorage.landlord);
    getLandlordById(landlordId).then((response) => {
      setLandlord(response);
      setProperties(response.properties);
      setTenants(response.tenants);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="display-2 text-center">My Account</h1>
        <Row>
          <Col sm={4}>Image</Col>
          <Col sm={8}>
            <h3 className="display-4">
              {landlord.firstName} {landlord.lastName}
            </h3>
            <p>Phone: {landlord.phone}</p>
            <p>Email: {landlord.email}</p>
            <p>Properties: {properties.length}</p>
            <p>Tenants: {tenants.length}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};
