import HotelNav from "./HotelNav";
import { Outlet } from "react-router-dom";

const Hotel = () => {
  return (
    <div className="md:grid grid-cols-[1fr_4fr]">
      <HotelNav />
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Hotel;
//pt-5 grid grid-cols-[1fr_3fr]
