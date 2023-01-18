import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr className="text-center">
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}

            {sortingField &&
              sortingField === field &&
              (sortingOrder === "asc" ? (
                <FiArrowDown
                  color="primary"
                  title="sort"
                  style={{ display: "inline-block" }}
                />
              ) : (
                <FiArrowUp color="primary" title="sort" />
              ))}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
