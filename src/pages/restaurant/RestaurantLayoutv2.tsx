import { Outlet } from "react-router-dom";

import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../lib/component/ResponsiveLayout";

import DialogProvider from "../../lib/component/DialogueBox/DialogProvider";
import DrawerProvider from "../../lib/component/Drawer/DrawerProvider";
import { SessionProvider } from "../../shell/context/SessionProvider";

import Frame from "../../lib/component/Frame/Frame";
import POSNavListProvider from "../../shell/context/PosNavListProvider";

const RestaurantLayout = () => (
  <Frame>
    <SessionProvider>
      <POSNavListProvider>
        <DialogProvider>
          <DrawerProvider>
            <ResponsiveLayout
              sidebar={(closeBar) => <RestaurantNav closeBar={closeBar} />}
            >
              <Outlet />
            </ResponsiveLayout>
          </DrawerProvider>
        </DialogProvider>
      </POSNavListProvider>
    </SessionProvider>
  </Frame>
);

export default RestaurantLayout;
