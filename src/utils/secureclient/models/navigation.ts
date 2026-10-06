import type { NavGroup } from "../component/Navbar";

export const hotelnavGroups: NavGroup[] = [
  {
    label: "Manage",
    items: [
      {
        label: "Test Component",
        path: "/test-component",
        resource: "test-component",
      },
      {
        label: "Restaurant Session",
        path: "/restaurant",
        resource: "restaurant",
      },
      {
        label: "PMS",
        path: "/accomodation",
        resource: "accommodation",
      },
      {
        label: "Activity Logs",
        path: "/activity-log",
        resource: "activity-logs",
      },
      {
        label: "Reports",
        path: "/reservation-report",
        resource: "reports",
      },
    ],
  },
  {
    label: "Utilities",
    items: [
      {
        label: "Business Calendar",
        path: "/business-calender",
        resource: "businesscalender",
      },
    ],
  },
];

export const schoolnav: NavGroup[] = [
  {
    label: "Homework",
    items: [
      {
        label: "School Calendar",
        path: "/business-calender",
        resource: "businesscalender",
      },
    ],
  },
];
