import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { TenantCard } from "./TenantCard";
import { EditTenantForm } from "./TenantForm";
import { TenantDelete } from "./TenantDelete";
import { Row, Col } from "reactstrap";

export const TenantList = () => {
  const { getTenants, tenants } = useContext(TenantContext);
  const [filteredTenants, setFilteredTenants] = useState([]);

  useEffect(() => {
    getTenants();
  }, []);

  //only get tenants assigned to landlord
  useEffect(() => {
    const subsetTenants = tenants.filter(
      (tenant) => tenant.landlordId === parseInt(localStorage.landlord)
    );
    setFilteredTenants(subsetTenants);
  }, [tenants]);

  return (
    <Row>
      <div className="container d-flex justify-content-around">
        <div className="row wrap m-5">
          {filteredTenants.map((tenant) => {
            return (
              <Col sm={12} lg={6} xl={4}>
                <TenantCard
                  key={tenant.id}
                  tenant={tenant}
                  deleteBtn={<TenantDelete id={tenant.id} />}
                  editBtn={<EditTenantForm id={tenant.id} />}
                />
              </Col>
            );
          })}
        </div>
      </div>
    </Row>
  );
};
