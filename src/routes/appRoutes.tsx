//author:shrajja
//central route + navigation configuration
import type { ReactNode } from "react";
import type { Resources } from "../utils/secureclient/services/models/permission";
import Dashboard from "../component/Dashboard";
import TestComponent from "../pages/test/TestComponent";
import Activity from "../pages/activity-log/Activity";
import Hoteldetails from "../pages/hotel/pages/Hoteldetails";
import Reservation from "../pages/hotel/pages/Reservation";
import Rooms from "../pages/hotel/pages/Rooms";
import Dash from "../pages/hotel/Dash";
import HotelLayout from "../pages/hotel/HotelLayout";
import Products from "../pages/restaurant/dropdown/Products";
import Offers from "../XXcomponents/Offers";
import Pricelist from "../pages/restaurant/dropdown/Pricelist";
import Sales from "../pages/restaurant/pages/Sales";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import RestaurantLayout from "../pages/restaurant/RestaurantLayout";
import Report from "../pages/reports/Report";
import FinalAllReservationPage from "../pages/hotel/pages/FinalAllReservationPage";
import ReservationCalendar from "../pages/hotel/pages/ReservationCalendar";
import POSUserSession from "../pages/restaurant/pages/posuserSession/POSUserSession";
import { POSUserSessionProvider } from "../context/PosUserSessionContext";
import ViewHistory from "../pages/restaurant/pages/posuserSession/components/ViewHistory";
import PaymentHistory from "../pages/restaurant/pages/posuserSession/components/payment/PaymentHistory";

//information needed for a navigation
export type AppNav = {
  label?: string;
  group: string;
  resource: Resources;
};
//main route structure
export type AppRoute = {
  path?: string;
  element?: ReactNode;
  nav?: AppNav;
  index?: boolean;
  children?: AppRoute[];
};

export const appRoutes: AppRoute[] = [
  {
    index: true, //render default
    element: <Dashboard />,
  },

  {
    path: "test-component",
    element: <TestComponent />,
    nav: {
      label: "Test Component",
      group: "Manage",
      resource: "test-component",
    },
  },
  {
    path: "activity-log",
    element: <Activity />,
    nav: {
      label: "Activity Logs",
      group: "Manage",
      resource: "activity-logs",
    },
  },

  {
    path: "restaurant",
    element: (
      // <POSUserSessionProvider>
      <RestaurantLayout />
      // </POSUserSessionProvider>
    ),
    nav: {
      label: "Restaurant Session",
      group: "Manage",
      resource: "restaurant",
    },
    children: [
      {
        index: true,
        element: <RestaurantDashboard />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "price",
        element: <Pricelist />,
      },
      {
        path: "offer",
        element: <Offers />,
      },
      {
        path: "session",
        element: <POSUserSession />,
      },

      {
        path: "products",
        element: <Products />,
      },
      {
        path: "track",
        element: <ViewHistory />,
      },
      {
        path: "history",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "accomodation",
    element: <HotelLayout />,
    nav: {
      label: "PMS",
      group: "Manage",
      resource: "accommodation",
    },
    children: [
      {
        index: true,
        element: <Dash />,
      },
      {
        path: "room",
        element: <Rooms />,
      },
      {
        path: "reservation",
        element: <Reservation />,
        children: [
          {
            path: ":id",
            element: <Hoteldetails />,
          },
          {
            path: "all-reservation",
            element: <FinalAllReservationPage />,
          },
          {
            path: "reservation-calendar",
            element: <ReservationCalendar />,
          },
        ],
      },
    ],
  },
  {
    path: "reservation-report",
    element: <Report />,
    nav: {
      label: "Reports",
      group: "Manage",
      resource: "reports",
    },
  },

  {
    path: "business-calender",
    element: <div>Business Calendar</div>,
    nav: {
      label: "Business Calendar",
      group: "Utilities",
      resource: "businesscalender",
    },
  },
];
