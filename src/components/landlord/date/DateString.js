import React from "react";

export const DateString = (dobString) => {
  var mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (dobString !== undefined) {
    const dateString = dobString.split("-");
    const month = mL[parseInt(dateString[1] - 1)];
    const day = dateString[2];
    const year = dateString[0];
    return `${month} ${day} ${year}`;
  }
};
