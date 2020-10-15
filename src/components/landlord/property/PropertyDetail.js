import React, { useContext, useEffect, useState } from "react";
import { PropertyContext } from "./PropertyProvider";
import { useParams, useHistory } from "react-router-dom";

export const PropertyDetail = () => {
  const { getPropertyById } = useContext(PropertyContext);
  const [property, setProperty] = useState({});

  const { propertyId } = useParams();

  useEffect(() => {
    getPropertyById(propertyId).then((response) => {
      setProperty(response);
    });
  }, []);
  return (
    <article className="container">
      <h1 className="display-3">Hello</h1>
    </article>
  );
};
