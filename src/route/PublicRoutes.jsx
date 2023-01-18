import React from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import { classes } from "../data/layouts";

const PublicRoutes = () => {
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  // let [token, setToken] = useState(null);
  const location = useLocation();
  let dataLogin = localStorage.getItem("token");
  // setToken(dataLogin);
  // useEffect(() => {

  // }, []);
  return (
    <>
      {dataLogin ? (
        <Navigate
          to={`/dasboardgroup/${layout}`}
          state={{ from: location }}
          replace
        />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoutes;
