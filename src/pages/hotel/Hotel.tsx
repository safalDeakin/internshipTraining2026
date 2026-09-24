import { useState } from "react";
import HotelNav from "./HotelNav";
import ResponsiveLayout from "../../component/ResponsiveLayout";

const Hotel = () => {
  return (
    <ResponsiveLayout
      sidebar={(closeBar) => <HotelNav closeBar={closeBar} />}
    />
  );
};

export default Hotel;
