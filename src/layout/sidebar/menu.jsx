import {
  BarChart2,
  Table,
  Bell,
  DollarSign,
  Server,
  BarChart,
} from "react-feather";

export const MENUITEMS = [
  {
    Items: [
      {
        title: "Overview",
        icon: Table,
        type: "sub",
        active: true,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/dashboard/metersbygroup`,
            title: "Meters By Group",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard/overviewallmeters`,
            title: "All Meters",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    Items: [
      {
        title: "Variabel",
        icon: BarChart,
        path: `${process.env.PUBLIC_URL}/variabel`,
        type: "link",
        active: true,
      },
    ],
  },
  {
    Items: [
      {
        title: "Trend And Reports",
        icon: BarChart2,
        path: `${process.env.PUBLIC_URL}/trendandreport`,
        type: "link",
        active: true,
      },
    ],
  },
  {
    Items: [
      {
        title: "Billing",
        icon: DollarSign,
        path: `${process.env.PUBLIC_URL}/billing`,
        type: "link",
        active: true,
      },
    ],
  },
  {
    Items: [
      {
        title: "Master Data",
        icon: Server,
        type: "sub",
        active: true,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/dasboard/masterdata`,
            title: "Master Data",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboardgroup`,
            title: "Meter Group",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboardUser`,
            title: "User",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    Items: [
      {
        title: "Alarm",
        icon: Bell,
        path: `${process.env.PUBLIC_URL}/alarm`,
        type: "link",
        active: true,
      },
    ],
  },
];
