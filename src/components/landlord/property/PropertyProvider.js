import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data

export const PropertyContext = createContext();

// This component establishes what data can be used.
export const PropertyProvider = (props) => {
  const [properties, setProperties] = useState([]);

  const getProperties = () => {
    return fetch(
      "http://localhost:8088/properties?_expand=landlord&_expand=tenant"
    )
      .then((res) => res.json())
      .then(setProperties);
  };

  const addProperty = (propertyObj) => {
    return fetch("http://localhost:8088/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyObj),
    }).then(getProperties);
  };

  const getPropertyById = (id) => {
    return fetch(
      `http://localhost:8088/properties/${id}?_embed=tenants`,
      {}
    ).then((res) => res.json());
  };

  const deleteProperty = (propertyId) => {
    return fetch(`http://localhost:8088/properties/${propertyId}`, {
      method: "DELETE",
    }).then(getProperties);
  };

  const updateProperty = (property) => {
    return fetch(`http://localhost:8088/properties/${property.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    }).then(getProperties);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        addProperty,
        getPropertyById,
        deleteProperty,
        updateProperty,
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
};

//http://localhost:8088/properties?_embed=tenants
