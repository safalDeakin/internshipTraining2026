import RestaurantNav from "./RestaurantNav";
import ResponsiveLayout from "../../component/ResponsiveLayout";
import { useState } from "react";
import { X } from "lucide-react";
import { Outlet } from "react-router-dom";

const Restaurant = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <ResponsiveLayout
      sidebar={(closeBar) => (
        <RestaurantNav
          closeBar={closeBar}
          openSettings={() => setIsSettingOpen(true)}
        />
      )}
    >
      {/* Normal right-side content */}
      {!isSettingOpen && (
        <div>
          <h1>
            <Outlet />
          </h1>
        </div>
      )}

      {/* Settings */}
      {isSettingOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            bg-gray-600
            p-5

            md:static
            md:z-auto
            md:min-h-screen
            md:bg-gray-100
            md:p-6
          "
        >
          <div
            className="
              h-full
              rounded-lg
              bg-white
              p-5

              md:h-auto
              md:min-h-[400px]
              md:rounded-xl
              md:shadow
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Settings</h1>

              <button
                onClick={() => setIsSettingOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-6">
              <p className="text-gray-600">
                Setting options will be added soon...
              </p>
            </div>
          </div>
        </div>
      )}
    </ResponsiveLayout>
  );
};

export default Restaurant;
