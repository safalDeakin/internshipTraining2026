import { Outlet } from "react-router-dom";
import PmsList from "./PmsList";

const Pms = () => {
  return (
    <div className="md:grid grid-cols-[1fr_2fr]">
      <PmsList />
      <div className="pl-4">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

export default Pms;
//grid grid-cols-[1fr_3fr]
