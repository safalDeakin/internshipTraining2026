
// import RatePlanPageRenderer from "../rate-plan/RatePlanPageRenderer";

import { NightAuditOverview } from "../hotel/pages/nightAudit/components/overview/NightAuditOverview";
import NightAuditRenderer from "../hotel/pages/nightAudit/components/overview/NightAuditRenderer";
import { KeyCardPage } from "../key-card/components/KeyCardDetail.tsx/KeyCardPage";
import { RepoKeyCardProvider } from "../key-card/context/KeyCardProvider";
import LostAndFoundRenderer from "../lost-found/LostAndFoundRenderer";
import { OverviewPage } from "../overview-page/components/overview/OverviewPage";




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

      {/* <NightAuditOverview /> */}
      {/* <NightAuditRenderer /> */}
      {/* <OverviewPage /> */}
      {/* <RoomDetailRenderer /> */}

      <RepoKeyCardProvider>
        <KeyCardPage />
      </RepoKeyCardProvider>
    </>

  );
};

export default TestComponent;