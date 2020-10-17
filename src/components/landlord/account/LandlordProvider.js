import React, { createContext } from "react";

export const LandlordContext = createContext();

export const LandlordProvider = (props) => {
  const getLandlordById = (id) => {
    return fetch(
      `http://localhost:8088/landlords/${id}?_embed=properties&_embed=tenants`
    ).then((res) => res.json());
  };
  return (
    <LandlordContext.Provider
      value={{
        getLandlordById,
      }}
    >
      {props.children}
    </LandlordContext.Provider>
  );
};
