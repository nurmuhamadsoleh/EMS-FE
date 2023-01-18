import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const DataTables = ({ users }) => {
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "nama",
      text: "Nama",
    },
    {
      dataField: "alamat",
      text: "Alamat",
    },
  ];
  return (
    <>
      <BootstrapTable keyField="id" data={users} columns={columns} />
    </>
  );
};

export default DataTables;
