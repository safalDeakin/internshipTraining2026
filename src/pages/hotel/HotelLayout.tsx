import { useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";

// Import your existing sidebar.
// Adjust this import path to match your project.
import HotelNav from "./HotelNav";
import RoomsDetailRenderer from "../hotel/pages/room-status/components/RoomsDetailRenderer";
import HousekeepingRenderer from "../houseKeeping/components/HousekeepingRenderer";
import RoomDetailRenderer from "../hotel/pages/roomDetail/RoomDetailRenderer";
import RatePlanPageRenderer from "../hotel/pages/rate-plan/RatePlanPageRenderer";
import FinalAllReservationPage from "../hotel/pages/FinalAllReservationPage";
import ReservationCalendar from "../hotel/pages/ReservationCalendar";
import SettingRenderer from "../popupsetting/components/SettingRenderer";
import LostAndFoundRenderer from "../lost-found/LostAndFoundRenderer";
import NightAuditRenderer from "./pages/nightAudit/components/overview/NightAuditRenderer";

/*
|--------------------------------------------------------------------------
| PLACEHOLDER COMPONENT
|--------------------------------------------------------------------------
|
| This is temporary UI so you can test every menu option immediately.
|
| Replace <DemoComponent title="..." /> with your actual component.
|
| Example:
| <DemoComponent title="Room List" />
|
| becomes:
| <RoomList />
|
*/

interface DemoComponentProps {
  title: string;
}

function DemoComponent({ title }: DemoComponentProps) {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Placeholder component. Replace this with your actual component.
      </p>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| WORKSPACE COMPONENT
|--------------------------------------------------------------------------
|
| Use this wrapper when you want multiple components side by side.
|
| It displays one column on smaller screens and two columns on
| extra-large screens.
|
*/

interface WorkspaceProps {
  children: ReactNode;
}

function Workspace({ children }: WorkspaceProps) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
      {children}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| HOTEL LAYOUT
|--------------------------------------------------------------------------
*/

type ViewKey =
  | "quick-rooms"
  | "quick-housekeeping"
  | "all-rooms"
  | "rate-plan"
  | "offers"
  | "sales-settings"
  | "staff-access"
  | "device-setup"
  | "housekeeping"
  | "night-audit"
  | "lost-found"
  | "guest-request"
  | "arrivals"
  | "in-house"
  | "overdue"
  | "room"
  | "all-reservation"
  | "reservation-calendar";

export default function HotelLayout() {
  /*
   * null means no custom view has been selected.
   *
   * The existing nested route will be displayed instead.
   */
  const [activeView, setActiveView] = useState<ViewKey | null>(
    null,
  );

  /*
   * Render the components associated with the selected option.
   *
   * Each case can render:
   * - A single component.
   * - Two components side by side.
   * - More than two components.
   */

  const renderContent = () => {
    switch (activeView) {
      /*
      |--------------------------------------------------------------------------
      | QUICK ACCESS ICONS
      |--------------------------------------------------------------------------
      */
      case "quick-rooms":
        return (
          <RoomsDetailRenderer />
        );

      case "quick-housekeeping":
        return (
          <HousekeepingRenderer />
        );

      /*
      |--------------------------------------------------------------------------
      | HOTEL DROPDOWN: MANAGE
      |--------------------------------------------------------------------------
      */

      case "all-rooms":
        return (
          <RoomDetailRenderer />
        );

      case "rate-plan":
        return (
          <RatePlanPageRenderer />
        );

      case "offers":
        // Replace with your real OffersAndDiscounts component.
        return (
          <DemoComponent title="Offers and Discounts" />
        );

      /*
      |--------------------------------------------------------------------------
      | HOTEL DROPDOWN: CONFIGURATION
      |--------------------------------------------------------------------------
      */

      case "sales-settings":
        // Replace with your real SalesSettings component.
        return (
          <SettingRenderer />
        );

      case "staff-access":
        // Replace with your real StaffAccess component.
        return (
          <SettingRenderer />
        );

      case "device-setup":
        // Replace with your real DeviceSetup component.
        return (
          <SettingRenderer />
        );

      /*
      |--------------------------------------------------------------------------
      | HOTEL DROPDOWN: OPERATIONS
      |--------------------------------------------------------------------------
      */

      case "housekeeping":
        // Housekeeping and Maintenance displayed side by side.
        return (
          <Workspace>
            {/* Replace with <Housekeeping /> */}
            <DemoComponent title="Housekeeping" />

            {/* Replace with <Maintenance /> */}
            <DemoComponent title="Maintenance" />
          </Workspace>
        );

      case "night-audit":
        return (
          <NightAuditRenderer />
        );


      case "lost-found":
        // Replace with your real NightAudit component.
        return (
          <LostAndFoundRenderer />
        );

      /*
      |--------------------------------------------------------------------------
      | FRONT-DESK
      |--------------------------------------------------------------------------
      */

      case "guest-request":
        // Replace with your real GuestRequest component.
        return (
          <DemoComponent title="Guest Request" />
        );

      case "arrivals":
        return (
          <FinalAllReservationPage />
        );

      case "in-house":
        return (
          <FinalAllReservationPage />
        );

      case "overdue":
        return (
          <FinalAllReservationPage />
        );

      /*
      |--------------------------------------------------------------------------
      | ROOMS
      |--------------------------------------------------------------------------
      */

      case "room":
        // Replace with your actual RoomList component.
        return (
          <DemoComponent title="Room List" />
        );

      /*
      |--------------------------------------------------------------------------
      | RESERVATIONS
      |--------------------------------------------------------------------------
      */

      case "all-reservation":
        return (
          <FinalAllReservationPage />
        );

      case "reservation-calendar":
        return (
          <ReservationCalendar />
        );

      /*
      |--------------------------------------------------------------------------
      | DEFAULT VIEW
      |--------------------------------------------------------------------------
      |
      | When no sidebar option has been selected, render the component
      | associated with the current React Router route.
      |
      */

      default:
        return <Outlet />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0">
        <HotelNav onSelectView={(view) => setActiveView(view as ViewKey)} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 overflow-x-auto bg-gray-50 p-4">
        {renderContent()}
      </main>
    </div>
  );
}