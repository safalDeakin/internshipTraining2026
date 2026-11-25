import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";

// Import your existing sidebar.
// Adjust this import path to match your project.
import HotelNav from "./HotelNav";
// import FinalAllReservationPage from "../hotel/pages/FinalAllReservationPage";
import DialogProvider from "../../lib/component/DialogueBox/DialogProvider";
import DrawerProvider from "../../lib/component/Drawer/DrawerProvider";
import Frame from "../../lib/component/Frame/Frame";

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


export default function HotelLayout() {

  return (
    <Frame>
      {/* SIDEBAR */}

      {/* MAIN CONTENT */}
      <DialogProvider>
        <DrawerProvider>
          <HotelNav />
          <Outlet />
        </DrawerProvider>
      </DialogProvider>
    </Frame>

  );
}