import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "./TenantProvider";
import { TenantCard } from "./TenantCard";
import { EditTenantForm } from "./TenantForm";
import { PropertyContext } from "../property/PropertyProvider";
import { TenantDelete } from "./TenantDelete";

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
              deleteBtn={<TenantDelete id={tenant.id} />}
              editBtn={<EditTenantForm id={tenant.id} />}
            />
          );
        })}
      </div>
    </div>
  );
};
