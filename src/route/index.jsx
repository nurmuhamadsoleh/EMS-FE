import React from "react";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../layout/loader";
import LayoutRoutes from "./LayoutRoutes";
import { classes } from "../data/layouts";

const Routers = () => {
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
  }, [abortController]);

  return (
    <BrowserRouter basename={"/"}>
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}`}
              element={
                <Navigate
                  to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
                />
              }
            />
            <Route path={`/*`} element={<LayoutRoutes />} />
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;
