import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { routesUser } from "./RoutesUser";
import { routes } from "./Routes";
import AppLayout from "../components/layout";
import RequireAuth from "./RequireAuth";
import MetersByGroup from "../components/dashboard/default";
import OverviewAllMeters from "../components/dashboard/ecommerce";
import PageNotFoud from "./PageNotFoud";
import PublicRoutes from "./PublicRoutes";
// import { Login } from "../constant";
import { classes } from "../data/layouts";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import DashbaordUser from "../components/MasterData/User/Dashboard";
const ROLES = {
  USR: "USR",
  ADM: "ADM",
};
const LayoutRoutes = () => {
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  let [isLogin, setIsLogin] = useState(false);
  let [token, setToken] = useState(null);
  let [role, setRole] = useState(null);
  useEffect(() => {
    let dataRole = localStorage.getItem("role");
    setRole(dataRole);
    console.log("role", dataRole);
    let dataToken = localStorage.getItem("token");
    console.log("data token", dataToken);
    setToken(dataToken);
    if (!dataToken) {
      setTimeout(() => {
        setIsLogin(false);
      }, 1000);
    }
    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
  }, []);
  console.log("app token", token);
  console.log("app role", role);
  return (
    <>
      <Routes>
        {/* Layout */}
        {/* Routing */}
        {/* {routes.map(({ path, Component }, i) => (
          
        ))} */}
        {/* App layout */}
        <Route path="/" element={<AppLayout />}>
          {!token && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Login />} />
              </Route>
            </>
          )}

          <Route element={<RequireAuth allowedRoles={[ROLES.USR]} />}>
            {/* Variable */}
            {/* {routesUser.map(({ path, Component }) => (
              <Route path={path} element={Component} />
            ))} */}
            {/* <Route path={`/dashboardUser/${layout}/`} element={DashbaordUser} /> */}
            {routes.map(({ path, Component, aksesrole }) => (
              <>
                {role === aksesrole ? (
                  <Route path={path} element={Component} />
                ) : (
                  <Route path="*" element={<PageNotFoud />} />
                )}
              </>
            ))}
            {/* <Route
              path={`/dashboard/metersbygroup/${layout}/`}
              element={<h1 style={{ marginTop: 30 }}>Data</h1>}
            /> */}
          </Route>
          <Route path="*" element={<PageNotFoud />} />
        </Route>
      </Routes>
    </>
  );
};

export default LayoutRoutes;
