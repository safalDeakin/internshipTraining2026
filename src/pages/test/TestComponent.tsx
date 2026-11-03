// import RatePlanPageRenderer from "../rate-plan/RatePlanPageRenderer";

import LostAndFoundRenderer from "../lost-found/LostAndFoundRenderer";
import PettyCash from "./pettycash/PettyCash";
import RefundSidebar from "./refund/Refund";

const TestComponent = () => {
  return (
    <>
      {/* <ResponsiveLayout
     sidebar={(closeBar) => <TestNav closeBar={closeBar} />}
    <RatePlanPageRenderer />
     <PackageRenderer />
     <RoomsDetailRenderer/> */}

      {/* <LostAndFoundRenderer /> */}
      {/* <FinalReceipts /> */}
      <RefundSidebar />
      <PettyCash />
    </>
  );
};

export default TestComponent;
