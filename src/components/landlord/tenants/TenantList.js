import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { TenantCard } from "./TenantCard";
import { Button } from "reactstrap";
import { EditTenantForm } from "./TenantForm";
import { TenantsChanged } from "../property/PropertyCardTenantInfo";
import { PropertyContext } from "../property/PropertyProvider";

export const TenantList = () => {
  const { getTenants, tenants, deleteTenant } = useContext(TenantContext);
  const { getProperties } = useContext(PropertyContext);
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
    <div className="container d-flex justify-content-around">
      <div className="row wrap m-5">
        {filteredTenants.map((tenant) => {
          return (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              deleteBtn={
                <Button
                  outline
                  color="danger"
                  className="tenantCardBtn"
                  onClick={() => {
                    deleteTenant(tenant.id)
                      .then(getProperties)
                      .then(TenantsChanged()); //update property cards
                  }}
                >
                  {" "}
                  Delete
                </Button>
              }
              editBtn={<EditTenantForm id={tenant.id} />}
            />
          );
        })}
      </div>
    </div>
  );
};
