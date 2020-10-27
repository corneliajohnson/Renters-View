import React from "react";
import { Pagination, PaginationItem, PaginationLink, Button } from "reactstrap";

export const PaginationPages = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* <Pagination style={{ left: "50%", position: "relative" }}>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} className="page-item m-1">
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              href="!#"
              className="page-link"
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination> */}
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
    </>
  );
};
