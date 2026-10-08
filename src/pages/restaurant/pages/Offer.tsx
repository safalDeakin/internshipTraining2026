//author:shrajja
import { Outlet } from "react-router-dom";
import ListHeader from "../../../XXcomponents/ListHeader";

const Offer = () => {
  return (
    <div>
      <ListHeader />
      {/* <ListHeroSection /> */}

      <Outlet />
    </div>
  );
};

export default Offer;
