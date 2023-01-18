import React, { useEffect, useState, useMemo } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem active={i === currentPage}>
          <PaginationLink key={i} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
      </PaginationItem>
      {paginationItems}
      {/* <PaginationItem>
          <PaginationLink
            next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem> */}
    </Pagination>
  );
};

export default PaginationComponent;
