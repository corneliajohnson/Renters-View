import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "../../landlord/tenants/TenantProvider";
import { PropertyContext } from "../../landlord/property/PropertyProvider";
import { Row, Col, Table } from "reactstrap";
import { MessageForm } from "./TenantMessageForm";
import { DateString } from "../../landlord/date/DateString";

export const TenantProperty = () => {
  const { getTenantById } = useContext(TenantContext);
  const { getPropertyById } = useContext(PropertyContext);

  const [tenant, setTenant] = useState({});
  const [property, setProperty] = useState({});
  const [landlord, setLandlord] = useState({});
  const [propertyMaintenance, setPropertMaintenance] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

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
        setPayments(response.payments);
      });
    }
  }, [tenant.propertyId]);

  //only show payments the tenant made
  useEffect(() => {
    const subset = payments.filter(
      (payment) =>
        payment.firstName === tenant.firstName &&
        payment.lastName === tenant.lastName
    );

    const sortedPayDate = subset.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredPayments(sortedPayDate);
  }, [tenant, payments]);

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
          <Col sm={12} md={4} className="mb-5">
            <h3>Tenant</h3>
            <div className="property__tenant">
              <p>
                {tenant.firstName} {tenant.lastName}
              </p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
            </div>
          </Col>
          <Col sm={12} md={4} className="mb-5">
            <h3>Landlord</h3>
            <p>
              {landlord.firstName} {landlord.lastName}
            </p>
            <p>Email: {landlord.email}</p>
            <p>Phone Number: {landlord.phone}</p>
            <MessageForm />
          </Col>
          <Col sm={12} md={4} className="mb-2">
            <div className="property__moreInfor">
              <h3>Property Info</h3>
              Rent Price:{" "}
              {property.rentAmount ? `$ ${property.rentAmount}` : "N/A"}
              <p>
                Lease Begin:{" "}
                {property.leaseStartDate
                  ? DateString(property.leaseStartDate)
                  : "N/A"}
              </p>
              <p>
                Lease Ends:{" "}
                {property.leaseEndDate
                  ? DateString(property.leaseStartDate)
                  : "N/A"}
              </p>
              <p>
                Lease Term: {property.leaseTerm ? property.leaseTerm : "N/A"}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="m-5">
          <Col sm={12} md={4} className="mb-5">
            <div>
              <h3>Payments</h3>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => {
                    return (
                      <tr>
                        <td>{DateString(payment.date)}</td>
                        <td>{payment.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col sm={12} md={8} className="mb-5">
            <div className="property_maintenatce">
              <h3>Maintenance</h3>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Synopsis</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyMaintenance.map((request) => {
                    return request.length === 0 ? (
                      "None"
                    ) : (
                      <tr>
                        <td>
                          {" "}
                          {new Date(request.dateAdded).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                        </td>
                        {"   "}
                        <td>{request.synopsis}</td>
                        {"   "}
                        {request.complete ? (
                          <td className="text-success">
                            Complete {DateString(request.dateComplete)}
                          </td>
                        ) : (
                          <td className="text-danger">Pending</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        {/* payment area */}
      </div>
    </>
  );
};
