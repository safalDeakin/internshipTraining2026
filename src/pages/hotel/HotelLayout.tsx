import HotelNav from "./HotelNav";
import ResponsiveLayout from "../../component/ResponsiveLayout";

const HotelLayout = () => {
  return (
    <ResponsiveLayout
      sidebar={(closeBar) => <HotelNav closeBar={closeBar} />}
    />
  );
};

export default HotelLayout;
