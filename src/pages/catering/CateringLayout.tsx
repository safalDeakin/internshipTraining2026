import React from "react";
import ResponsiveLayout from "../../component/ResponsiveLayout";
import CateringNavbar from "./CateringNavbar";

const CateringLayout = () => {
  return (
    <ResponsiveLayout
      sidebar={(closeBar) => <CateringNavbar closeBar={closeBar} />}
    />
  );
};

export default CateringLayout;
