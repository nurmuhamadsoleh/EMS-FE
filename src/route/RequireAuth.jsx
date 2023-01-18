import React from "react";
import { Outlet } from "react-router";

const RequireAuth = ({ allowedRoles }) => {
  let data = [];
  let dataRole = localStorage.getItem("role");
  data.push(dataRole);
  console.log("roles", data);

  return (
    <>{data?.find((r) => allowedRoles?.includes(r)) ? <Outlet /> : null}</> //jika role nya sama dengan yang di filter maka akan menampilkan menu tetapi jika tidak terdapat role yang di cari akan menampilkan null
    // <div>RequireAuth</div>
  );
};

export default RequireAuth;
