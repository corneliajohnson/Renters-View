import React, { useContext, useEffect, useState } from "react";
import { LandlordContext } from "./LandlordProvider";
import { EditLandlordForm } from "./LandlordEditForm";
//import { CloudinaryContext } from "../cloudinary/CloudinaryProvider";
import { Row, Col, Input } from "reactstrap";

export const AccountView = () => {
  const { getLandlordById, landlords } = useContext(LandlordContext);
  // const { uploadImage, image, loading } = useContext(CloudinaryContext);

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
  }, [landlords]);

  return (
    <>
      <div className="container">
        <h1 className="display-2 text-center m-5">My Account</h1>
        <Row className="m-5">
          <Col className="p-5" sm={4}>
            <img width="100%" src={landlord.image} alt="no image" />
          </Col>
          <Col className="p-4" sm={8}>
            <h3 className="display-4">
              {landlord.firstName} {landlord.lastName}
            </h3>
            <p>
              {" "}
              <span style={{ fontWeight: "bold" }}>Phone Number:</span>{" "}
              {landlord.phone}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
              {landlord.email}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Properties: </span>{" "}
              {properties.length}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Tenants: </span>
              {tenants.length}
            </p>
            <EditLandlordForm />
            <p className="m-3">
              Your name, phone number, email are visible to your tenants.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};
