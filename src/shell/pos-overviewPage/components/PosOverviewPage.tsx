import { CollectionSummary } from "./CollectionSummary";
import { TodaySummary } from "./TodaySummary";

import { CashVariancePanel } from "./CashVariancePanel";
import { usePosOverviewHook } from "../provider/usePosOverview";
import useDrawer from "../../../lib/component/Drawer/useDrawer";
import RunPOSSession from "../../RunPOSSession";
import UserSessionProvider from "../../context/UserSessionProvider";

const PosOverviewPage = () => {

  const { organizationId, overviews, selectedSessionId, selectedDate } = usePosOverviewHook();
  const { openDrawer } = useDrawer();


  const openSessionMode = () => {

    openDrawer({
      title: "Shell Settings",
      width: "100%",
      closeOnBackdrop: false,
      closeOnEscape: false,
      showHeader: false,
      content: (
        <UserSessionProvider orgId={String(organizationId)}>
          <RunPOSSession />
        </UserSessionProvider>
      ),
    });
  }

  const overview = overviews?.[0];
  if (!overview) {
    return (
      <div className="p-4 text-center text-gray-500">
        No POS Overview Data found.
      </div>
    );
  }

  return (
    <main className="space-y-5">
      <TodaySummary
        data={overview}
        selectedDate={selectedDate}
        staffName={selectedSessionId ?? undefined}
        onOpenSessionMode={() => {
          openSessionMode()
        }}
      />

      <CashVariancePanel
        chartData={overview.chartData}
        heatmap={overview.heatmap}
      />

      <CollectionSummary data={overview} />
    </main>
  );
};

export default PosOverviewPage;
