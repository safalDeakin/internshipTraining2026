// author: shrajja

import { Outlet, } from "react-router-dom";

import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../lib/component/ResponsiveLayout";

import DialogProvider from "../../lib/component/DialogueBox/DialogProvider";
import DrawerProvider from "../../lib/component/Drawer/DrawerProvider";
import { SessionProvider } from "../../shell/context/SessionProvider";
import Frame from "../../lib/component/Frame/Frame";
// Coordinates session operations and drawer rendering.

const RestaurantLayout = () => (
  <Frame>
    <SessionProvider>
      <DialogProvider>
        <DrawerProvider>
          <ResponsiveLayout
            sidebar={(closeBar) => (
              <RestaurantNav
                closeBar={closeBar}
              />
            )}
          >
            <Outlet />
          </ResponsiveLayout>
        </DrawerProvider>
      </DialogProvider>
    </SessionProvider>
  </Frame >
);

export default RestaurantLayout;

