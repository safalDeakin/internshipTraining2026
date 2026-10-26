
// import RatePlanPageRenderer from "../rate-plan/RatePlanPageRenderer";

// import HouseKeepingRenderer from "../houseKeeping/components/HousekeepingRenderer";
import HotelReservation from "../hotel/pages/hotelReservation/HotelReservation";
import PrintReservationForm from "../reports/printableData/PrintReservationForm";



const TestComponent = () => {
  return (
    <>
      {/* <ResponsiveLayout
     sidebar={(closeBar) => <TestNav closeBar={closeBar} />}
    <RatePlanPageRenderer />
     <PackageRenderer />
     <RoomsDetailRenderer/> */}
      {/* <HouseKeepingRenderer /> */}

      {/* <PrintReservationForm />
       */}
      <HotelReservation />

    </>

  );
};

export default TestComponent;