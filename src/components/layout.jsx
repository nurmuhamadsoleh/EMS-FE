import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Loader from "../layout/loader";
import Taptop from "../layout/tap-top";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import ThemeCustomize from "../layout/theme-customizer";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  let [token, setToken] = useState(null);
  let [role, setRole] = useState(null);
  useEffect(() => {
    let dataRole = localStorage.getItem("role");
    console.log("role", dataRole);
    setRole(dataRole);
    let dataToken = localStorage.getItem("token");
    setToken(dataToken);
  }, []);
  console.log("token layout", Outlet);
  return (
    <Fragment>
      <Loader />
      <Taptop />

      {!token && (
        <>
          <div className="page-body">
            <div>
              <Outlet />
            </div>
          </div>
        </>
      )}
      {token && (
        <>
          <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Header />
            <div className="page-body-wrapper">
              <Sidebar />
              <div className="page-body bg-danger">
                <Outlet />
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
      {/* <ThemeCustomize />
      <ToastContainer /> */}
    </Fragment>
  );
};

export default AppLayout;
