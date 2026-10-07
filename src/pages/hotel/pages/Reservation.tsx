//author:Shrajja
import { Outlet } from "react-router-dom";
const Reservation = () => {
  return (
    <div className=" min-h-screen">
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Reservation;
