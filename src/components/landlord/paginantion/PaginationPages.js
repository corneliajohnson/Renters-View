import React from "react";
import { Button, Link } from "reactstrap";

export const PaginationPages = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ left: "50%", position: "relative" }}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          outline
          color="secondary"
          className="m-1"
          style={{ borderRadius: "25px" }}
          onClick={(e) => {
            e.preventDefault();
            paginate(number);
          }}
          href="!#"
        >
          {number}
        </Button>
      ))}
    </div>
  );
};
