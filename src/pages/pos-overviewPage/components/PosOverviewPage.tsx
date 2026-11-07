import { useOutletContext } from "react-router-dom";

import { CashVariancePanel } from "./CashVariancePanel";
import { CollectionSummary } from "./CollectionSummary";
import { TodaySummary } from "./TodaySummary";

import { usePosOverviewHook } from "../provider/usePosOverview";
import { usePOSUserSession } from "../../restaurant/pages/posuserSession/context/usePOSUserSession";

interface RestaurantOutletContext {
  openSessionMode: () => void;
}

const PosOverviewPage = () => {
  const { openSessionMode } = useOutletContext<RestaurantOutletContext>();

  const { overviews } = usePosOverviewHook();
  const { selectedDate, selectedStaffName } = usePOSUserSession();

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
        staffName={selectedStaffName ?? undefined}
        onOpenSessionMode={openSessionMode}
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
