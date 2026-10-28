import React from "react";
import { Outlet } from "react-router-dom";
import PmsList from "../PmsList";

const Activate = () => {
  return (
    <div className="p-5">
      <Outlet />
    </div>
  );
};

export default Activate;
