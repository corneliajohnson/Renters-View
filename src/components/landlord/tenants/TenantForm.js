import React, { useContext, useEffect, useState, useRef } from "react";
import { Button } from "reactstrap";

export const TenantForm = () => {
  return (
    <div className="container text-center">
      <h1 className="display-2 m-5">My Tenants</h1>
      <Button type="button">Add New Tenant</Button>
    </div>
  );
};
