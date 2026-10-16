
// import RatePlanPageRenderer from "../rate-plan/RatePlanPageRenderer";

import HouseKeepingRenderer from "../houseKeeping/components/HousekeepingRenderer";



const TestComponent = () => {
  return (
    <>
      {/* <ResponsiveLayout
     sidebar={(closeBar) => <TestNav closeBar={closeBar} />}
    <RatePlanPageRenderer />
     <PackageRenderer />
     <RoomsDetailRenderer/> */}
      <HouseKeepingRenderer />

    </>

  );
};

export default TestComponent;