import React, { createContext, useState } from "react";

export const LandlordContext = createContext();

export const LandlordProvider = (props) => {
  const [landlords, setLandlords] = useState([]);

  const getLandlords = () => {
    return fetch("http://localhost:8088/landlords")
      .then((res) => res.json())
      .then(setLandlords);
  };
  const getLandlordById = (id) => {
    return fetch(
      `http://localhost:8088/landlords/${id}?_embed=properties&_embed=tenants`
    ).then((res) => res.json());
  };

  const updateLandlord = (landlord) => {
    return fetch(`http://localhost:8088/landlords/${landlord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(landlord),
    }).then(getLandlords);
  };

  return (
    <LandlordContext.Provider
      value={{
        landlords,
        getLandlords,
        getLandlordById,
        updateLandlord,
      }}
    >
      {props.children}
    </LandlordContext.Provider>
  );
};
