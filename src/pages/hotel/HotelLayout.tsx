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
      </DialogProvider >
    </Frame >
  );
}
