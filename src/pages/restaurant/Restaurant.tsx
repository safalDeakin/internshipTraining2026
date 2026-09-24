import RestaurantNav from "./RestaurantNav";
import ResponsiveLayout from "../../component/ResponsiveLayout";
import { useState } from "react";
import { X } from "lucide-react";

const Restaurant = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  return (
    <>
      <ResponsiveLayout
        sidebar={(closeBar) => (
          <RestaurantNav
            closeBar={closeBar}
            openSettings={() => setIsSettingOpen(true)}
          />
        )}
      />

      {isSettingOpen && (
        <div className="bg-gray-600">
          <div>
            <h1 className="text-white">Settings</h1>
            <button
              className="text-white"
              onClick={() => setIsSettingOpen(false)}
            >
              <X />
            </button>
            <div>
              <p className="text-white">
                Setting options will be added soon...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Restaurant;
//grid grid-cols-[1fr_4fr] pt-5 gap-10
