import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data

export const PropertyContext = createContext();

// This component establishes what data can be used.
export const PropertyProvider = (props) => {
  const [properties, setProperties] = useState([]);

  const getProperties = () => {
    return fetch("http://localhost:8088/properties")
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
      `http://localhost:8088/properties/${id}?_expand=landlord`,
      {}
    ).then((res) => res.json());
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        addProperty,
        getPropertyById,
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
};
