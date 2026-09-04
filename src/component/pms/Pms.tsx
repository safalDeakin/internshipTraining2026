import { Outlet } from "react-router-dom";
import PmsList from "./PmsList";

const Pms = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <PmsList />
      <Outlet />
    </div>
  );
};

export default Pms;
