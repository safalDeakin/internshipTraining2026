import React from "react";
import HotelNav from "./HotelNav";
import { Outlet } from "react-router-dom";

const Hotel = () => {
  return (
    <div className="pt-5 grid grid-cols-[1fr_3fr]">
      <HotelNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Hotel;
