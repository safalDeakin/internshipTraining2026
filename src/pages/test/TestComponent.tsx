// import RatePlanPageRenderer from "../rate-plan/RatePlanPageRenderer";

// import { NightAuditOverview } from "../hotel/pages/nightAudit/components/overview/NightAuditOverview";
// import NightAuditRenderer from "../hotel/pages/nightAudit/components/overview/NightAuditRenderer";
// import { KeyCardPage } from "../key-card/components/KeyCardDetail.tsx/KeyCardPage";
// import { RepoKeyCardProvider } from "../key-card/context/KeyCardProvider";
// import LostAndFoundRenderer from "../lost-found/LostAndFoundRenderer";
// import { OverviewPage } from "../overview-page/components/overview/OverviewPage";

import Scrollable from "../../lib/component/scrollable/Scrollable";
import OffersDetails from "../restaurant/dropdown/offer/components/OffersDetails";
import { initialOfferData } from "../restaurant/dropdown/offer/data/initialOfferData";
import CashMovement from "../restaurant/pages/overview/cash-summary/cash-movement/CashMovement";
import PettyCash from "../restaurant/pages/overview/cash-summary/petty-cash/PettyCash";
import FormBuilderTest from "./FormBuilderTest";
// const selectedOffer = {
//   id: 1,
//   name: "Weekend Special Offer",
//   // Add the remaining properties required by your Offer type
// };

const TestComponent = () => {
  const selectedOffer = initialOfferData[0];
  return (
    <>
      {/* <ResponsiveLayout
     sidebar={(closeBar) => <TestNav closeBar={closeBar} />}
    <RatePlanPageRenderer />
     <PackageRenderer />
     <RoomsDetailRenderer/> */}

      {/* <LostAndFoundRenderer /> */}
      {/* <FinalReceipts /> */}

      {/* <NightAuditOverview /> */}
      {/* <NightAuditRenderer /> */}
      {/* <OverviewPage /> */}
      {/* <RoomDetailRenderer /> */}

      {/* <RepoKeyCardProvider>
        <KeyCardPage />
      </RepoKeyCardProvider> */}

      {/* <PosOvervewRenderer /> */}
      {/* <GuestCheckoutRenderer /> */}

      {/* <PickupRequestForm /> */}
      {/* <RoomServiceTask />
      <RoomServiceTaskCompletionSheet />

      <RefundSidebar />
      //
      {/* <GuestRequestPageRenderer /> */}
      {/* < PackageRenderer /> */}
      {/* <GuestCheckoutRenderer /> */}
      {/* <FormBuilderTest /> */}
      {/* <PettyCash /> */}
      {/* <CashMovement /> */}
      <Scrollable direction="y">
        {" "}
        <OffersDetails offer={selectedOffer} />
      </Scrollable>
    </>
  );
};

export default TestComponent;
