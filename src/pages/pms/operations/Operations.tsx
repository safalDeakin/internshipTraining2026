import { NavLink, Outlet } from "react-router-dom";

const Operations = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <Outlet />
    </div>
  );
};

export default Operations;
