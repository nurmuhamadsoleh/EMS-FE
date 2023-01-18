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
// Billing
import Billing from "../components/Billing";
// Variabel
import Variabel from "../components/Variable";
import ForgoutPassword from "../components/MasterData/User/ResetUser";

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

export const routesUser = [
  // Overview
  {
    path: `${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}/`,
    Component: <h1>Data</h1>,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/overviewallmeters/${layout}/`,
    Component: <OverviewAllMeters />,
  },
  //Trend and Reports
  {
    path: `${process.env.PUBLIC_URL}/trendandreport${layout}/`,
    Component: <TrendAndReport />,
  },
  // Alarm
  {
    path: `${process.env.PUBLIC_URL}/alarm/${layout}/`,
    Component: <Alarm />,
  },
  // Users
  {
    path: `${process.env.PUBLIC_URL}/dashboardUser/${layout}/`,
    Component: <DashboardUser />,
  },
  {
    path: `${process.env.PUBLIC_URL}/ManangerUserEdit/${layout}/:id`,
    Component: <ManagementUserEdit />,
  },
  {
    path: `${process.env.PUBLIC_URL}/ManangerUserAdd/${layout}/`,
    Component: <ManagementUserAdd />,
  },
  // Meter Group
  {
    path: `${process.env.PUBLIC_URL}/dashboardgroup/${layout}/`,
    Component: <DataTable />,
  },
  {
    path: `${process.env.PUBLIC_URL}/metersGroup/${layout}/:id`,
    Component: <MeterGroupEdit />,
  },
  {
    path: `${process.env.PUBLIC_URL}/metergroupadd/${layout}/`,
    Component: <MeterGroupAdd />,
  },
  // Master Data
  {
    path: `${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}/`,
    Component: <MasterData />,
  },
  {
    path: `${process.env.PUBLIC_URL}/masterdataedit/${layout}/:id`,
    Component: <MasterDataEdit />,
  },
  {
    path: `${process.env.PUBLIC_URL}/masterdataadd/${layout}/`,
    Component: <MasterDataAdd />,
  },
  // Billing
  {
    path: `${process.env.PUBLIC_URL}/billing/${layout}/`,
    Component: <Billing />,
  },
  // Variabel
  {
    path: `${process.env.PUBLIC_URL}/variabel/${layout}/`,
    Component: <Variabel />,
  },
  // Forgut Password
  {
    path: `${process.env.PUBLIC_URL}/resetpass/${layout}/`,
    Component: <ForgoutPassword />,
  },
  // {
  //   path: `${process.env.PUBLIC_URL}/`
  // }
];
