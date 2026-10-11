//author:Shrajja
import { Outlet } from "react-router-dom";
const Reservation = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen">
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Reservation;
