// Overview
import MetersByGroup from "../components/dashboard/default";
import OverviewAllMeters from "../components/dashboard/ecommerce";
// Users
import DashboardUser from "../components/MasterData/User/Dashboard";
import ManagementUserEdit from "../components/MasterData/User/Edit";
import ManagementUserAdd from "../components/MasterData/User/Add";
// Trend And Report
import TrendAndReport from "../components/trendandreport";
// Master Group
import DataTable from "../components/MasterData/MeterGroup/Dashboard";
import MeterGroupEdit from "../components/MasterData/MeterGroup/Edit";
import MeterGroupAdd from "../components/MasterData/MeterGroup/Add";
// Master Data
import MasterData from "../components/MasterData/MasterData/Dashboard";
import MasterDataAdd from "../components/MasterData/MasterData/Add";
import MasterDataEdit from "../components/MasterData/MasterData/Edit";
// Alarm
import Alarm from "../components/Alarm";
import AlarmHistory from "../components/Alarm/alarm_history";
// Billing
import Billing from "../components/Billing";
import Calculate from "../components/Billing/Calculate";
// Variabel
import Variabel from "../components/Variable";
import ForgoutPassword from "../components/MasterData/User/ResetUser";
import { useEffect } from "react";

// Create Account
import Register from "../pages/authentication/register";
// Forgot Pass
import Forgetpwd from "../pages/authentication/forgetpwd";
// Login
import Logins from "../pages/authentication/login";
import { classes } from "../data/layouts";
const defaultLayoutObj = classes.find(
  (item) => Object.values(item).pop(1) === "compact-wrapper"
);
const layout =
  localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

export const routes = [
  // Overview
  {
    path: `${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`,
    Component: <MetersByGroup />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/overviewallmeters/:id/${layout}/`,
    Component: <OverviewAllMeters />,
    aksesrole: "USR",
  },
  // //Trend and Reports
  {
    path: `${process.env.PUBLIC_URL}/trendandreport/${layout}/`,
    Component: <TrendAndReport />,
    aksesrole: "USR",
  },
  // Alarm
  {
    path: `${process.env.PUBLIC_URL}/alarm/${layout}/`,
    Component: <Alarm />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/alarmhistory/${layout}/`,
    Component: <AlarmHistory />,
    aksesrole: "USR",
  },
  // // Users Memory Leak
  {
    path: `${process.env.PUBLIC_URL}/dashboardUser/${layout}/`,
    Component: <DashboardUser />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/manangerUserEdit/${layout}/:id`,
    Component: <ManagementUserEdit />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/manangerUserAdd/${layout}/`,
    Component: <ManagementUserAdd />,
    aksesrole: "USR",
  },
  // // Meter Group
  {
    path: `${process.env.PUBLIC_URL}/dashboardgroup/${layout}/`,
    Component: <DataTable />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/metersGroup/${layout}/:id`,
    Component: <MeterGroupEdit />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/metergroupadd/${layout}/`,
    Component: <MeterGroupAdd />,
    aksesrole: "USR",
  },
  // // Master Data
  {
    path: `${process.env.PUBLIC_URL}/dasboard/masterdata/${layout}/`,
    Component: <MasterData />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/masterdataedit/:id/${layout}`,
    Component: <MasterDataEdit />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/masterdataadd/${layout}/`,
    Component: <MasterDataAdd />,
    aksesrole: "USR",
  },
  // Billing
  {
    path: `${process.env.PUBLIC_URL}/billing/${layout}/`,
    Component: <Billing />,
    aksesrole: "USR",
  },
  // Variabel
  {
    path: `${process.env.PUBLIC_URL}/variabel/${layout}/`,
    Component: <Variabel />,
    aksesrole: "USR",
  },
  {
    path: `${process.env.PUBLIC_URL}/calculate/${layout}/`,
    Component: <Calculate />,
    aksesrole: "USR",
  },
  // // Forgut Password
  {
    path: `${process.env.PUBLIC_URL}/resetpass/${layout}/`,
    Component: <ForgoutPassword />,
    aksesrole: "USR",
  },
  // {
  //   path: `${process.env.PUBLIC_URL}/`
  // }
];
